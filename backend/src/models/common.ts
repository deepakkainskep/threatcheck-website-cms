import { Schema } from "mongoose";
export const statusValues = ["DRAFT", "PUBLISHED"] as const;
export const seoSchema = new Schema({ title: String, description: String, keywords: [String], canonicalUrl: String, ogImage: String }, { _id: false });
export const contentBlockSchema = new Schema({ type: { type: String, enum: ["heading", "paragraph", "list", "image", "quote", "link", "callout"], required: true }, title: String, level: Number, text: String, items: [String], url: String, altText: String }, { _id: true });
