import mongoose, { Schema } from "mongoose";
export const WebsiteSettings = mongoose.model(
  "WebsiteSettings",
  new Schema(
    { key: { type: String, unique: true }, value: Schema.Types.Mixed },
    { timestamps: true },
  ),
);
