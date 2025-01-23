import express from 'express';
import bodyParser from 'body-parser';
const app=express();
const port=3000;
import mongoose from 'mongoose';
import {Todo} from './models/Todo.js';
mongoose.connect('mongodb://localhost:27017/Todo');

app.get('/',(req,res)=>
{
    const data=new Todo({name:"Pranay",age:20,ismanager:false});
    data.save();
    res.send("data inserted succssfully")
});


app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})
