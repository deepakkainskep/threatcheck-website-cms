import multer from"multer";import{env}from"../config/env.js";import{AppError}from"./error.middleware.js";
const imageTypes=["image/jpeg","image/png","image/webp"];const docTypes=["application/pdf"];
// Files are kept in memory only, then streamed straight to Azure Blob Storage.
// Nothing is written to the local /uploads folder anymore.
const storage=multer.memoryStorage();
export const upload=multer({storage,limits:{fileSize:env.maxFileSize},fileFilter:(req,file,cb)=>{const allowed=imageTypes.includes(file.mimetype)||docTypes.includes(file.mimetype);if(!allowed)return cb(new AppError(415,"Unsupported file type") as any,false);cb(null,true)}});
