const express=require('express');
const path=require('path');
const hbs=require('hbs');


const app=express();

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