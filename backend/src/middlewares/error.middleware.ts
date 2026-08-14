import { ErrorRequestHandler } from "express";
export class AppError extends Error{constructor(public statusCode:number,message:string){super(message)}}
export const notFound=()=>{throw new AppError(404,"Route not found")};
export const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{const status=err.statusCode||400;res.status(status).json({success:false,message:status>=500?"Something went wrong":err.message||"Invalid request"});};
