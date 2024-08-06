const express=require('express');
const path=require('path');
const hbs=require('hbs');
const dotenv = require("dotenv");
const session = require('express-session');

const port = process.env.PORT;
// console.log(port);
const app=express();

dotenv.config({path:'../.env'});
require("./db/conn");

// app.use(express.json());

// const path1=path.join(__dirname,"../public");
// const path2=path.join(__dirname,"./views");

// app.use(express.static(path1));

// app.set("view engine","hbs");

// app.set("views",path2);

const path1 = path.join(__dirname,"../public");
const path2 = path.join(__dirname,"/views");
const path3 = path.join(__dirname,"/partials");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path1));
app.set("view engine", "hbs");
app.set("views", path2);

hbs.registerPartials(path3);

app.use(session({
    secret: 'hello',
    resave: false,
    saveUninitialized: true
}));

var x=0;

const middlware1 = (req,res,next) =>{
    if(x==1) next();
    else {
        res.render("login");
    }
}


app.get("/",(req,res)=>{
    res.render('index');
});

app.get("/login",(req,res)=>{
    res.render('login');
});

app.get("/signup",(req,res)=>{
    res.render('signup');
});

app.get("/cart",(req,res)=>{
    res.render('addtocart');
});

app.listen(8000,()=>{
    console.log('at port no 8000');
});