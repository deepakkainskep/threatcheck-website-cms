import mongoose, { Schema } from "mongoose";
export const Tag = mongoose.model(
  "Tag",
  new Schema({ name: String }, { timestamps: true }),
);
