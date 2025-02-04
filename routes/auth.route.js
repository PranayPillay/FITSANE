const express = require('express')
const router = express.Router();
const regi=require('../models/register.js');
const ejs=require('ejs');

router.post('/register', (req, res, next) => {
    console.log("register route");
    const { name, Age,Gender, password, Email } = req.body;
    let data = new regi({ name, Age,Gender, password, Email })
    data.save();
    const username=(`${name}`);
    console.log(username);
    console.log(`name is ${name}`);
    console.log(`age is ${Age}`);
    console.log(`gender is ${Gender}`);
    console.log(`password is ${password}`);
    console.log(`email is ${Email}`);
    res.render('index',{username:username,Gender:Gender});
    
})

router.post('/login', (req, res, next) => {
    console.log("login route");
})

router.post('/refresh-token', (req, res, next) => {
    console.log("refresh-token route");
})

router.delete('/logout', (req, res, next) => {
    console.log("logout route");
})

module.exports = router;