const express = require('express')
const router = express.Router();
const regi=require('../models/register.js');
const userrev=require('../models/reviews.js');
const createrror=require('http-errors');
const ejs=require('ejs');

router.post('/register', async(req, res, next) => {
    console.log("register route");
    try{
    const { name, Age,Gender, password, Email } = req.body;
    if(!Email || !password)throw createrror.BadRequest();
        const doesExist=await regi.findOne({Email:Email})
    if(doesExist)throw createrror.Conflict(`${Email} already registered`)
     let data = new regi({ name, Age,Gender, password, Email })
    const saveduser=await data.save();

    const username=(`${name}`);
    console.log(username);
    console.log(`name is ${name}`);
    console.log(`age is ${Age}`);
    console.log(`gender is ${Gender}`);
    console.log(`password is ${password}`);
    console.log(`email is ${Email}`);
    res.render('login',{username:username,Gender:Gender});
}
catch(error)
{
    next(error);
}   
})

router.post('/login', async(req, res, next) => {
    console.log("login route");
    const {Email,password}=req.body;
    const exists=await regi.findOne({Email:Email,password:password});
    if(exists){
    res.render('index');
    }
    else
{
    throw createrror.BadRequest();
}
    
})

router.post('/refresh-token', (req, res, next) => {
    console.log("refresh-token route");
})

router.delete('/logout', (req, res, next) => {
    console.log("logout route");
})


router.post('/reviews',(req,res)=>
{
    
})
module.exports = router;