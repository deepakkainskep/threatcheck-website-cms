import mongoose, { Schema } from "mongoose";

export const ContactSubmission = mongoose.model(
  "ContactSubmission",
  new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      subject: { type: String, required: true },
      message: { type: String, required: true },
    },
    { timestamps: true }
  )
);
