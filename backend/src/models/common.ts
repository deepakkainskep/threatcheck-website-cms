import { Schema } from "mongoose";
export const statusValues = ["DRAFT", "PUBLISHED"] as const;

/** Fields required for the draft/publish versioning workflow.
 *  Include in every content model schema to prevent Mongoose strict mode from stripping them. */
export const versioningFields = {
  originalId: { type: String, default: null },
  hasDraft: { type: Boolean, default: false },
  isSnapshot: { type: Boolean, default: false },
};
export const seoSchema = new Schema(
  {
    title: String,
    description: String,
    keywords: [String],
    canonicalUrl: String,
    ogImage: String,
  },
  { _id: false },
);
export const contentBlockSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "heading",
        "paragraph",
        "list",
        "image",
        "quote",
        "link",
        "callout",
      ],
      required: true,
    },
    title: String,
    level: Number,
    text: String,
    items: [String],
    url: String,
    altText: String,
  },
  { _id: true },
);
