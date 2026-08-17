import mongoose, { Schema } from "mongoose";
import { seoSchema, statusValues } from "./common.js";
const schema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    logo: String,
    category: String,
    websiteUrl: String,
    status: { type: String, enum: statusValues, default: "DRAFT" },
    displayOrder: { type: Number, default: 0 },
    seo: seoSchema,
  },
  { timestamps: true },
);
export const Integration = mongoose.model("Integration", schema);
