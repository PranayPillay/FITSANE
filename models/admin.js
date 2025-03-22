const mongoose=require('mongoose');
const adminlogs=new mongoose.Schema({
    username:String,
    password:String
    

})

const adminhandle=mongoose.model('Admins',adminlogs);
module.exports=adminhandle;