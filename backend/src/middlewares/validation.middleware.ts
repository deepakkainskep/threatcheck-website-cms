import { RequestHandler } from "express";import { ZodSchema } from "zod";
export const validate=(schema:ZodSchema):RequestHandler=>(req,res,next)=>{const r=schema.safeParse({body:req.body,query:req.query,params:req.params});if(!r.success)return res.status(422).json({success:false,message:"Validation failed",issues:r.error.flatten()});Object.assign(req,r.data);next();};
