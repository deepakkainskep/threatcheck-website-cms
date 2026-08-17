import mongoose, { Schema } from "mongoose";

export const DemoRequest = mongoose.model(
  "DemoRequest",
  new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      company: { type: String, required: true },
      size: { type: String, required: true },
      timeline: { type: String, required: true },
      message: { type: String },
      selectedDate: { type: String },
      selectedTime: { type: String },
    },
    { timestamps: true },
  ),
);
