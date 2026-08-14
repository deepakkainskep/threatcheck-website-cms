import { RequestHandler } from "express";import{AppError}from"./error.middleware.js";
export const requireRole=(...roles:string[]):RequestHandler=>(req,res,next)=>roles.includes(req.user?.role)?next():next(new AppError(403,"Forbidden"));
