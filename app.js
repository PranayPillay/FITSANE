const express=require('express');
const createrror=require('http-errors');
const bodyParser =require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');
const router=require('router');
const ejs=require('ejs');
const regi=require('./models/register.js');
const path=require('path');
const VisitorCount = require('./models/visitorCount');
const session = require('express-session');
const ProgressRouter = require('./routes/progress.route.js');
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



app.use(session({
    secret: 'yourSuperSecretRandomKey123!@#',
    resave: false,
    saveUninitialized: true
}));


app.use('/progress', ProgressRouter);


app.get('/register', (req, res) => {
        res.render('register', { error: null, oldInput: {} });
    });

    
app.use('/auth',AuthRouter);

app.get('/homeworkout/:slug',(req,res)=>
    {
        const Email=req.params.slug;
        res.render("workout",{Email:Email});
        console.log(Email)
        
    })

app.get('/members',(req,res)=>
{
res.render('members');
});


app.get('/home/:slug',(req,res)=>

{
    const Email=req.session.userEmail
    res.render('index',{Email:Email});
    
    
})

app.get('/calisthenics/:slug',(req,res)=>
{
    const Email=req.params.slug;
    res.render("cal",{Email:Email});
}
)

app.get('/gym/:slug',(req,res)=>
{
    const Email=req.params.slug;
    res.render("gymworkout",{Email:Email});
})




app.use(async (req, res, next) => {
    try {
        let counter = await VisitorCount.findOne();
        if (!counter) {
            counter = new VisitorCount({ count: 1 });
        } else {
            counter.count += 1;
        }
        await counter.save();
        console.log(`Total Visits: ${counter.count}`);
    } catch (err) {
        console.error("Visitor count error:", err);
    }
    next();
});


app.get('/ectomorph/:slug',(req,res)=>
{
    const {Email}=req.params.slug
    res.render("ectomorph",{Email:req.params.slug});
    console.log(req.params.slug)
    console.log(req.session.userEmail)
})   

app.get("/mesomorph/:slug",(req,res)=>
{
    const {Email}=req.params.slug
    res.render("mesomorph",{Email:req.params.slug});
    console.log(req.params.slug)
    console.log(req.session.userEmail)
    res.render("mesomorph");
})

app.get('/admin-registeration',async(req,res)=>
    {
        const visitorData = await VisitorCount.findOne();
        res.render('adminregister',{ visitCount: visitorData ? visitorData.count : 0 })
    })
    
app.get("/endomorph/:slug",(req,res)=>
{
    const {Email}=req.params.slug
    res.render("endomorph",{Email:req.params.slug});
    console.log(req.params.slug)
    console.log(req.session.userEmail)
    res.render("endomorph");
})

app.get('/fitsanelogin',(req,res)=>
    {
         res.render('login')
    })

app.get('/fitsaneregister',(req,res)=>
{
    res.render('register')
})    

app.get("/bmi",(req,res)=>
{
    res.render("bmi",{Email:req.session.userEmail});
})

app.get("/reviews",(req,res)=>
{
    res.render("reviews")
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