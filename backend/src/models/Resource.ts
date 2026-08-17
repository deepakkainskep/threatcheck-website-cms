import mongoose, { Schema } from "mongoose";
import { seoSchema, statusValues } from "./common.js";
const schema = new Schema(
  {
    type: String,
    typeName: String,
    title: { type: String, required: true },
    subtitle: String,
    excerpt: String,
    category: String,
    date: String,
    downloadSize: String,
    fileType: String,
    image: String,
    fileUrl: String,
    highlights: [String],
    content: String,
    status: { type: String, enum: statusValues, default: "DRAFT" },
    seo: seoSchema,
    publishedAt: Date,
  },
  { timestamps: true },
);
export const Resource = mongoose.model("Resource", schema);
