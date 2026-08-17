import mongoose, { Schema } from "mongoose";
import { seoSchema } from "./common.js";
export const SeoMetadata = mongoose.model(
  "SeoMetadata",
  new Schema(
    { entity: String, entityId: String, ...seoSchema.obj },
    { timestamps: true },
  ),
);
