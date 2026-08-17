import { Response } from "express";
export const ok = (res: Response, data: any, pagination?: any) =>
  res.json({ success: true, data, ...(pagination ? { pagination } : {}) });
export const created = (res: Response, data: any) =>
  res.status(201).json({ success: true, data });
