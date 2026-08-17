import mongoose, { Schema } from "mongoose";
import { seoSchema, statusValues } from "./common.js";
const resultSchema = new Schema(
  { metric: String, label: String },
  { _id: true },
);
const schema = new Schema(
  {
    title: { type: String, required: true },
    company: String,
    industry: String,
    size: String,
    challenge: String,
    solution: String,
    implementation: String,
    results: [resultSchema],
    businessImpact: String,
    image: String,
    status: { type: String, enum: statusValues, default: "DRAFT" },
    seo: seoSchema,
    publishedAt: Date,
  },
  { timestamps: true },
);
export const CaseStudy = mongoose.model("CaseStudy", schema);
