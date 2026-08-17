import mongoose, { Schema } from "mongoose";
export type Role = "SUPERADMIN" | "ADMIN";
const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["SUPERADMIN", "ADMIN"], required: true },
    disabled: { type: Boolean, default: false },
    refreshTokenHash: String,
    lastLoginAt: Date,
  },
  { timestamps: true },
);
export const User = mongoose.model("User", userSchema);
