import { Router } from "express";
import { Model } from "mongoose";
import { z } from "zod";
import { created, ok } from "../utils/response.js";
import { slugify } from "../utils/slug.js";
import { AppError } from "../middlewares/error.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { audit } from "../services/auditLog.service.js";
const idSchema = z.object({ params: z.object({ id: z.string().min(1) }) });
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
export function adminRoutes(model: Model<any>, entity: string, schema: any) {
  const r = Router();
  r.get("/", async (req, res, next) => {
    try {
      const page = Math.max(Number(req.query.page || 1), 1),
        limit = Math.min(Math.max(Number(req.query.limit || 12), 1), 100);
      const q: any = {};
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
  r.get("/:id", async (req, res, next) => {
    try {
      const data = await model.findById(req.params.id);
      if (!data) throw new AppError(404, "Not found");
      ok(res, data);
    } catch (e) {
      next(e);
    }
  });
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
  r.put(
    "/:id",
    validate(
      z.object({ params: idSchema.shape.params, body: schema.partial() }),
    ),
    async (req, res, next) => {
      try {
        const data = await model.findByIdAndUpdate(req.params.id, req.body, {
          returnDocument: "after",
          runValidators: true,
        });
        if (!data) throw new AppError(404, "Not found");
        await audit(req, `updated ${entity}`, entity, String(req.params.id));
        ok(res, data);
      } catch (e: any) {
        next(e);
      }
    },
  );
  r.delete("/:id", async (req, res, next) => {
    try {
      const data = await model.findByIdAndDelete(req.params.id);
      if (!data) throw new AppError(404, "Not found");
      await audit(req, `deleted ${entity}`, entity, req.params.id);
      ok(res, { deleted: true });
    } catch (e) {
      next(e);
    }
  });
  for (const action of ["publish", "unpublish"]) {
    r.patch(`/:id/${action}`, async (req, res, next) => {
      try {
        const status = action === "publish" ? "PUBLISHED" : "DRAFT";
        const data = await model.findByIdAndUpdate(
          req.params.id,
          {
            status,
            publishedAt: status === "PUBLISHED" ? new Date() : undefined,
          },
          { returnDocument: "after" },
        );
        if (!data) throw new AppError(404, "Not found");
        await audit(req, `${action}ed ${entity}`, entity, req.params.id);
        ok(res, data);
      } catch (e) {
        next(e);
      }
    });
  }
  return r;
}
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
