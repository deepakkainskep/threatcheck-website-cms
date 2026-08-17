import { Router } from "express";
import { upload } from "../../middlewares/upload.middleware.js";
import { Media } from "../../models/Media.js";
import { ok, created } from "../../utils/response.js";
import { audit } from "../../services/auditLog.service.js";
import {
  uploadBlob,
  replaceBlob,
  deleteBlob,
} from "../../services/azureBlob.service.js";
import { AppError } from "../../middlewares/error.middleware.js";

const r = Router();

r.get("/", async (req, res) =>
  ok(res, await Media.find().sort({ createdAt: -1 })),
);

function buildBlobName(bucket: string, originalName: string): string {
  const dot = originalName.lastIndexOf(".");
  const ext = dot >= 0 ? originalName.slice(dot).toLowerCase() : "";
  return `${bucket}/${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
}

// Upload: send the file straight to Azure Blob Storage, then persist the
// resulting Blob URL in MongoDB. If the Azure upload fails, nothing is
// written to MongoDB.
const handleUpload = async (req: any, res: any, next: any) => {
  try {
    const f = req.file;
    if (!f) throw new AppError(400, "No file provided");
    const bucket = String(req.params.bucket || "media").replace(
      /[^a-z0-9-]/gi,
      "",
    );
    const blobName = buildBlobName(bucket, f.originalname);

    const { url } = await uploadBlob(blobName, f.buffer, f.mimetype);

    const data = await Media.create({
      fileName: blobName,
      originalName: f.originalname,
      mimeType: f.mimetype,
      size: f.size,
      path: blobName,
      url,
      altText: req.body.altText,
      uploadedBy: req.user?._id,
    });

    await audit(req, "uploaded media", "media", String(data._id));
    created(res, data);
  } catch (e) {
    next(e);
  }
};

r.post("/upload", upload.single("file"), handleUpload);
r.post("/upload/:bucket", upload.single("file"), handleUpload);

// Replace: upload the new image to Azure first, update MongoDB with the
// new Blob URL, and only then delete the old Azure blob. If the Azure
// upload fails, MongoDB is left untouched. If the MongoDB update fails
// after a successful upload, the newly uploaded blob is rolled back.
const handleReplace = async (req: any, res: any, next: any) => {
  try {
    const existing = await Media.findById(req.params.id);
    if (!existing) throw new AppError(404, "Media not found");

    const f = req.file;
    if (!f) throw new AppError(400, "No file provided");

    const bucket = String(req.params.bucket || "media").replace(
      /[^a-z0-9-]/gi,
      "",
    );
    const newBlobName = buildBlobName(bucket, f.originalname);

    const { url } = await replaceBlob(newBlobName, f.buffer, f.mimetype);

    const oldRef = existing.path || existing.url;
    let updated;
    try {
      updated = await Media.findByIdAndUpdate(
        req.params.id,
        {
          fileName: newBlobName,
          originalName: f.originalname,
          mimeType: f.mimetype,
          size: f.size,
          path: newBlobName,
          url,
          altText: req.body.altText ?? existing.altText,
        },
        { returnDocument: "after" },
      );
    } catch (dbErr) {
      // Roll back the newly uploaded blob since MongoDB was not updated
      await deleteBlob(newBlobName).catch(() => {});
      throw dbErr;
    }

    if (oldRef) {
      await deleteBlob(oldRef).catch((err) => {
        console.error("Failed to delete old Azure blob after replace:", err);
      });
    }

    await audit(req, "replaced media", "media", req.params.id);
    ok(res, updated);
  } catch (e) {
    next(e);
  }
};

r.put("/:id/replace", upload.single("file"), handleReplace);
r.put("/:id/replace/:bucket", upload.single("file"), handleReplace);

// Delete: remove the Azure blob first, then remove the MongoDB record.
r.delete("/:id", async (req, res, next) => {
  try {
    const existing = await Media.findById(req.params.id);
    if (!existing) throw new AppError(404, "Media not found");

    const ref = existing.path || existing.url;
    if (ref) await deleteBlob(ref);

    await Media.findByIdAndDelete(req.params.id);
    await audit(req, "deleted media", "media", req.params.id);
    ok(res, { deleted: true });
  } catch (e) {
    next(e);
  }
});

export default r;
