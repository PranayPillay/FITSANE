import mongoose from "mongoose";
const TodoSchema=new mongoose.Schema({
    name:String,
    age:Number,
    ismanager:Boolean
});

export const Todo=mongoose.model('Todo',TodoSchema);
