import mongoose from "mongoose";
import { env } from "./env.js";
export async function connectDatabase() {
  await mongoose.connect(env.mongoUri);
  const maskedUri = env.mongoUri.replace(/:([^:@]+)@/, ':***@');
  console.log(`MongoDB connected: ${maskedUri}`);
}
