import { Router } from "express";
import { Model } from "mongoose";
import { z } from "zod";
import { created, ok } from "../utils/response.js";
import { slugify } from "../utils/slug.js";
import { AppError } from "../middlewares/error.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { audit } from "../services/auditLog.service.js";

const idSchema = z.object({ params: z.object({ id: z.string().min(1) }) });


// ─── Public Routes (read-only, only PUBLISHED, no drafts) ───────────────────
export function publicRoutes(model: Model<any>) {
  const r = Router();

  r.get("/", async (req, res, next) => {
    try {
      const data = await model
        .find({ status: "PUBLISHED" })
        .sort({ displayOrder: 1, createdAt: -1 });
      ok(res, data);
    } catch (e) {
      next(e);
    }
  });

  r.get("/:id", async (req, res, next) => {
    try {
      const data = await model.findOne({
        _id: req.params.id,
        status: "PUBLISHED",
      });
      if (!data) throw new AppError(404, "Not found");
      ok(res, data);
    } catch (e) {
      next(e);
    }
  });

  return r;
}

// ─── Admin Routes (full CRUD + draft/publish versioning) ────────────────────
export function adminRoutes(model: Model<any>, entity: string, schema: any) {
  const r = Router();

  // LIST: exclude published items that have an active draft copy
  r.get("/", async (req, res, next) => {
    try {
      const page = Math.max(Number(req.query.page || 1), 1),
        limit = Math.min(Math.max(Number(req.query.limit || 12), 1), 100);
      const q: any = {};

      // Hide published originals that currently have a pending draft
      q.hasDraft = { $ne: true };

      if (req.query.status) q.status = req.query.status;
      if (req.query.category) q.category = req.query.category;
      if (req.query.search) {
        const s = String(req.query.search);
        q.$or = [
          { title: new RegExp(s, "i") },
          { name: new RegExp(s, "i") },
          { excerpt: new RegExp(s, "i") },
          { category: new RegExp(s, "i") },
        ];
      }
      const total = await model.countDocuments(q);
      const data = await model
        .find(q)
        .sort({ createdAt: req.query.sort === "oldest" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      ok(res, data, {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      });
    } catch (e) {
      next(e);
    }
  });

  // GET ONE
  r.get("/:id", async (req, res, next) => {
    try {
      const data = await model.findById(req.params.id);
      if (!data) throw new AppError(404, "Not found");
      ok(res, data);
    } catch (e) {
      next(e);
    }
  });

  // PUBLISH ALL DRAFTS: batch-publish every pending DRAFT in this collection
  r.patch("/publish-all-drafts", async (req, res, next) => {
    try {
      // Find all draft documents (both standalone drafts and draft copies of published items)
      const drafts = await model.find({ status: "DRAFT" });

      let published = 0;
      let errors: string[] = [];

      for (const draft of drafts) {
        try {
          if (draft.originalId) {
            // Draft copy of a published item — merge back to original
            const original = await model.findById(draft.originalId);
            if (original) {
              const docObj: any = draft.toObject();
              delete docObj._id;
              delete docObj.createdAt;
              delete docObj.updatedAt;
              delete docObj.originalId;
              delete docObj.__v;

              for (const key in docObj) {
                original.set(key, docObj[key]);
              }
              original.status = "PUBLISHED";
              original.hasDraft = false;
              original.publishedAt = new Date();

              await original.save();
              await draft.deleteOne();
              published++;
            }
          } else {
            // Standalone draft — publish it directly
            draft.status = "PUBLISHED";
            draft.publishedAt = new Date();
            await draft.save();
            published++;
          }
        } catch (err: any) {
          errors.push(String(draft._id));
        }
      }

      await audit(req, `published all drafts (${published}) for ${entity}`, entity, "batch");
      ok(res, { published, errors });
    } catch (e) {
      next(e);
    }
  });

  // CREATE
  r.post("/", validate(z.object({ body: schema })), async (req, res, next) => {
    try {
      const body: any = req.body;
      const data = await model.create(body);
      await audit(req, `created ${entity}`, entity, String(data._id));
      created(res, data);
    } catch (e: any) {
      next(e);
    }
  });

  // UPDATE: if the item is PUBLISHED, create/update a Draft copy instead of modifying the live document
  r.put(
    "/:id",
    validate(
      z.object({ params: idSchema.shape.params, body: schema.partial() }),
    ),
    async (req, res, next) => {
      try {
        const existing = await model.findById(req.params.id);
        if (!existing) throw new AppError(404, "Not found");

        if (existing.status === "PUBLISHED") {
          // Check if a draft already exists for this published item
          let draft = await model.findOne({
            originalId: String(existing._id),
            status: "DRAFT",
          });

          if (!draft) {
            // Create a new draft copy from the published item
            const copyData: any = existing.toObject();
            delete copyData._id;
            delete copyData.createdAt;
            delete copyData.updatedAt;

            // Apply the new edits onto the copy
            for (const key in req.body) {
              copyData[key] = req.body[key];
            }
            copyData.status = "DRAFT";
            copyData.originalId = String(existing._id);
            copyData.hasDraft = false;

            draft = await model.create(copyData);

            // Mark the published original as having an active draft
            existing.hasDraft = true;
            await existing.save();
          } else {
            // Update the existing draft in-place (don't create another copy)
            for (const key in req.body) {
              draft.set(key, req.body[key]);
            }
            draft.status = "DRAFT";
            await draft.save();
          }

          await audit(req, `updated ${entity} (saved as draft)`, entity, String(draft._id));
          ok(res, draft);
        } else {
          // Item is already a DRAFT (or new) — update it in-place
          for (const key in req.body) {
            existing.set(key, req.body[key]);
          }
          const data = await existing.save();
          await audit(req, `updated ${entity}`, entity, String(req.params.id));
          ok(res, data);
        }
      } catch (e: any) {
        next(e);
      }
    },
  );

  // DELETE: if deleting a draft, restore the original published item; if deleting an original, cascade-delete its drafts
  r.delete("/:id", async (req, res, next) => {
    try {
      const data = await model.findById(req.params.id);
      if (!data) throw new AppError(404, "Not found");

      if (data.originalId) {
        // This is a draft copy — discarding it should restore the original published item in the admin list
        const original = await model.findById(data.originalId);
        if (original) {
          original.hasDraft = false;
          await original.save();
        }
        await data.deleteOne();
        await audit(req, `discarded draft of ${entity}`, entity, req.params.id);
      } else {
        // Deleting an original (published or standalone draft) — also remove any associated draft copies
        await model.deleteMany({ originalId: String(data._id) });
        await data.deleteOne();
        await audit(req, `deleted ${entity}`, entity, req.params.id);
      }

      ok(res, { deleted: true });
    } catch (e) {
      next(e);
    }
  });

  // PUBLISH / UNPUBLISH with versioning support
  for (const action of ["publish", "unpublish"]) {
    r.patch(`/:id/${action}`, async (req, res, next) => {
      try {
        const document = await model.findById(req.params.id);
        if (!document) throw new AppError(404, "Not found");

        if (action === "publish") {
          if (document.originalId) {
            // Publishing a draft copy → merge its changes back into the original published document
            const original = await model.findById(document.originalId);
            if (original) {
              const docObj: any = document.toObject();
              delete docObj._id;
              delete docObj.createdAt;
              delete docObj.updatedAt;
              delete docObj.originalId;
              delete docObj.__v;

              for (const key in docObj) {
                original.set(key, docObj[key]);
              }
              original.status = "PUBLISHED";
              original.hasDraft = false;
              original.publishedAt = new Date();

              const savedOriginal = await original.save();
              // Clean up the draft document
              await document.deleteOne();

              await audit(req, `published ${entity}`, entity, String(savedOriginal._id));
              return ok(res, savedOriginal);
            } else {
              // Fallback: original is missing, promote the draft itself
              document.status = "PUBLISHED";
              document.originalId = null;
              document.hasDraft = false;
              document.publishedAt = new Date();
              const saved = await document.save();
              await audit(req, `published ${entity}`, entity, String(saved._id));
              return ok(res, saved);
            }
          } else {
            // Publishing a first-time standalone draft
            document.status = "PUBLISHED";
            document.publishedAt = new Date();
            const saved = await document.save();
            await audit(req, `published ${entity}`, entity, String(saved._id));
            return ok(res, saved);
          }
        } else {
          // UNPUBLISH
          if (document.originalId) {
            // If somehow a draft is being unpublished, unpublish its original instead
            const original = await model.findById(document.originalId);
            if (original) {
              original.status = "DRAFT";
              original.hasDraft = false;
              (original as any).publishedAt = undefined;
              const saved = await original.save();
              await document.deleteOne();
              await audit(req, `unpublished ${entity}`, entity, String(saved._id));
              return ok(res, saved);
            }
          }

          // Standard unpublish: revert to DRAFT, remove any pending draft copies
          document.status = "DRAFT";
          (document as any).publishedAt = undefined;
          document.hasDraft = false;
          await model.deleteMany({ originalId: String(document._id) });
          const saved = await document.save();
          await audit(req, `unpublished ${entity}`, entity, String(saved._id));
          return ok(res, saved);
        }
      } catch (e) {
        next(e);
      }
    });
  }

  return r;
}

// ─── Public Form Routes (contact/demo submissions) ──────────────────────────
export function publicFormRoutes(model: Model<any>, schema: any) {
  const r = Router();
  r.post("/", validate(z.object({ body: schema })), async (req, res, next) => {
    try {
      const body: any = req.body;
      const data = await model.create(body);
      created(res, data);
    } catch (e: any) {
      next(e);
    }
  });
  return r;
}
