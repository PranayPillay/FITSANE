const mongoose=require('mongoose');
const login=new mongoose.Schema({
    Email:String,
    password:String,
    date:Date
    

})

const loginn=mongoose.model('logins',login);
module.exports=loginn;