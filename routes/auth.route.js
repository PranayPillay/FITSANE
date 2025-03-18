const express = require('express')
const router = express.Router();
const regi=require('../models/register.js');
const userrev=require('../models/reviews.js');
const loginn=require('../models/login.js');
const createrror=require('http-errors');
const {authschema}=require('../helpers/validation_schema.js')
const ejs=require('ejs');
const joi=require('@hapi/joi')


router.post('/register', async(req, res, next) => {
    console.log("register route");
    try{
    const result=await authschema.validateAsync(req.body)
    console.log(result);
        const doesExist=await regi.findOne({Email:result.Email})
    if(doesExist)
    {
        res.send(`
            <script>
                alert("Email already exists! Please use a different email.");
                window.location.href = "/register";
            </script>
        `);
    }

     let data = new regi({ name:result.name, Age:result.Age,Gender:result.Gender,password:result.password, Email:result.Email })
    const saveduser=await data.save();

    res.render('login',{name:result.name,Gender:result.Gender});
    
}
catch(error) {
    if (error.isJoi === true) {
        let errorMessage = error.details[0].message;

        let alertMsg = "";
        if (errorMessage.includes("Email")) {
            alertMsg = "Invalid email format. Please enter a valid email address.";
        } else if (errorMessage.includes("password")) {
            alertMsg = "Password is required.";
        } else if (errorMessage.includes("name")) {
            alertMsg = "Name is required.";
        } else {
            alertMsg = "Please fill all required fields correctly.";
        }

        
        return res.render('register', {
            error: alertMsg,
            oldInput: req.body
        });
    } else {
        next(error);
    }
}


})

router.post('/login', async(req, res, next) => {
    console.log("login route");
    
    const {Email,password}=req.body;
    let date=new Date()
    const exists=await regi.findOne({Email:Email,password:password});
    if(exists)
    {
        req.session.userEmail = exists.Email;
    let userlogs=new loginn({Email,password,date})
    const savelogin= userlogs.save();
    res.render('index', { Email:req.session.userEmail });
    console.log(`${Email}`)
    console.log({Date:date})
    console.log(req.session.userEmail)
    }
    else
{
    res.send(`
        <script>
            alert("invalid username or password");
            window.location.href = "/fitsanelogin";
        </script>
    `);
}
    
})

router.post('/refresh-token', (req, res, next) => {
    console.log("refresh-token route");
})

router.delete('/logout', (req, res, next) => {
    console.log("logout route");
})


router.post('/Reviews',async(req, res, next) => {
   
    
   
    
    const {Email,desc}=req.body;
    let urev = new userrev({Email,desc});
    const savedrev=await urev.save();
    const rev={desc:desc}
    if(savedrev)
    {
        res.send(`
            <script>
                alert("review submitted successfully");
                window.location.href = "/home/${encodeURIComponent(Email)}";
            </script>
        `);
        
    }
    console.log({Email})

})
module.exports = router;