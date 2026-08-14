import { Request } from "express";import { AuditLog } from "../models/AuditLog.js";
export async function audit(req:Request,action:string,entity:string,entityId?:string,metadata?:any){await AuditLog.create({user:req.user?._id,action,entity,entityId,metadata,ip:req.ip});}
