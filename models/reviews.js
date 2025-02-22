const mongoose=require('mongoose');
const rev=new mongoose.Schema({
    name:String,
    Email:String,
    desc:String
})

const userrev=mongoose.model('reviews',rev);

module.exports=userrev;