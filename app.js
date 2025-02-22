const express=require('express');
const createrror=require('http-errors');
const bodyParser =require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');
const router=require('router');
const ejs=require('ejs');
const regi=require('./models/register.js');
const path=require('path');
const AuthRouter=require('./routes/auth.route.js');
const app = express();
require('dotenv').config();
require('./helpers/init_mongodb.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/', (req, res) =>
     {
    res.render('landing');
    
});



app.get('/register',(req,res)=>
{
    res.render('register');
})
app.use('/auth',AuthRouter);

app.get('/homeworkout',(req,res)=>
    {
        
        res.render("workout");
        
    })

app.get('/calisthenics',(req,res)=>
{
    res.render("cal");
}
)

app.get('/gym',(req,res)=>
{
    res.render("gymworkout");
})



app.get('/ectomorph',(req,res)=>
{
    res.render("ectomorph");
})   

app.get("/mesomorph",(req,res)=>
{
    res.render("mesomorph");
})

app.get("/endomorph",(req,res)=>
{
    res.render("endomorph");
})


app.get("/bmi",(req,res)=>
{
    res.render("bmi");
})

app.use(async(req, res,next) => {
    next(createrror.NotFound("url not found or invalid url"));

});

app.use((err,req,res,next)=>
{
res.status(err.status||500)
res.send({
    status:err.status||500,
    message: err.message
})
})

app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
})