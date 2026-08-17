import mongoose, { Schema } from "mongoose";
const schema = new Schema(
  {
    fileName: String,
    originalName: String,
    mimeType: String,
    size: Number,
    path: String,
    url: String,
    altText: String,
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);
export const Media = mongoose.model("Media", schema);
