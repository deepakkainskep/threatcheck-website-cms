import mongoose, { Schema } from "mongoose";
const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    action: String,
    entity: String,
    entityId: String,
    ip: String,
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true },
);
export const AuditLog = mongoose.model("AuditLog", schema);
