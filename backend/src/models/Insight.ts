import mongoose,{Schema} from "mongoose";import{contentBlockSchema,seoSchema,statusValues}from"./common.js";
const schema=new Schema({title:{type:String,required:true},subtitle:String,excerpt:String,category:String,author:String,role:String,date:String,readingTime:String,image:String,content:[contentBlockSchema],tags:[String],status:{type:String,enum:statusValues,default:"DRAFT"},seo:seoSchema,publishedAt:Date},{timestamps:true});
export const Insight=mongoose.model("Insight",schema);
