import mongoose,{Schema}from"mongoose";export const Category=mongoose.model("Category",new Schema({name:String,type:String},{timestamps:true}));
