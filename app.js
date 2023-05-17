const express = require('express');
const mongoose = require('mongoose');
const connect = require('./db/connect');
const authRoute = require('./routes/authRoutes');
const cookieParser=require("cookie-parser")
const {requireAuth,checkUser}=require("./middleware/authMiddleware")

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');


// database connection
const start=async()=>{
  await connect()
  app.listen(3000,()=>{console.log("server is running in port :3000")})
}
start()

// routes
app.get("*",checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoute)

app.get("/set-cookie",(req,res)=>{
  res.cookie("test",true,{
    maxAge:1000*60*60*24,
    httpOnly:true,
    // secure:true,
  })
  res.send("done")
})