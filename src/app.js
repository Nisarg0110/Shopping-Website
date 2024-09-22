const express=require('express');
const path=require('path');
const hbs=require('hbs');
const dotenv = require("dotenv");
const session = require('express-session');
const bodyParser = require('body-parser');


const Registers = require("./models/Register");
const Login = require("./models/Login");
// const { register } = require('module');


const port = process.env.PORT;
// console.log(port);
const app=express();

dotenv.config({path:'../.env'});
require("./db/conn");

app.use(session({
    secret: 'hello',
    resave: false,
    saveUninitialized: true
  }));

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

app.get("/logout" , (req,res) => {
    x=0;
    t=0;
    res.redirect("/"); 
});

app.use(bodyParser.json());

app.post("/signup" , async (req,res)=>{
    try {
        const { username,email,password } = req.body;
        console.log(username);
        const collections = await Registers.find({}).lean();
        for (const collection of collections) {
            if (collection.email === email) {
                return res.json({ txt: 'This email is already taken, try with another!' });
            }
            if (collection.phone === mobileNumber) {
                return res.json({ txt: 'This mobile number is already taken, try with another!' });
            }
            if (collection.username === username) {
                return res.json({ txt: 'This username is already taken, try with another!' });
            }
        }
        const registeruser = new Registers({
            username,
            email,
            password,
        });
        const data = await registeruser.save();
        res.json({txt:'Sign up succesfull, Try to log in now'});
    } catch (error) {
        console.log(error);
        res.json({txt:"Internal server error"})
    }
});


// console.log("ok1");

app.post("/login" , async(req,res) => {
    try {
        const { email, password } = req.body;
        const user = await Registers.findOne({email});
        console.log(user);
        const collections = await Registers.find({}).lean();
        // var fname,lname;
        // for (const collection of collections) {
        //     if (collection.email === email) {
        //         fname = collection.firstname;
        //         lname = collection.lastname;
        //     }
        // }
        for(var i=0;i<1;i++)
        {
            if (!user) {
                return res.json({ txt: "User not found" });
            }
            if (user.password !== password) {
                return res.json({ txt: "Invalid password" });
            } 
            
        }
        req.session.user = user;
        console.log(req.session.user);
        // req.session.fname = fname;
        // req.session.lname = lname;
        res.json({txt:"sucess"})
    } catch (err) {
        console.error(err);
        res.json({ txt: "Internal server error" });
    }
});

app.listen(8000,()=>{
    console.log('at port no 8000');
});