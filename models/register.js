const mongoose=require('mongoose');
const register=new mongoose.Schema({
    name:String,
    Age:Number,
    Gender:String,
    password:Number,
    Email:String

})

const regi=mongoose.model('user',register);
module.exports=regi;