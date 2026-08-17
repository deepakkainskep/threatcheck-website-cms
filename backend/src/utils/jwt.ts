import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
export const signAccess = (payload: object) =>
  jwt.sign(payload, env.accessSecret, {
    expiresIn: env.accessExpiresIn,
  } as SignOptions);
export const signRefresh = (payload: object) =>
  jwt.sign(payload, env.refreshSecret, {
    expiresIn: env.refreshExpiresIn,
  } as SignOptions);
export const verifyAccess = (t: string) =>
  jwt.verify(t, env.accessSecret) as any;
export const verifyRefresh = (t: string) =>
  jwt.verify(t, env.refreshSecret) as any;
