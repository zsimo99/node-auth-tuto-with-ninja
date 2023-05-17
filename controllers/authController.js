const User=require("../models/user")
const jwt=require("jsonwebtoken")

const handleErrors=(err)=>{
    console.log(err.message,err.code)
    let errors={}
    if(err.message==="incorrect email"){
        errors.email="this email is incorrect"
    }
    if(err.message==="incorrect password"){
        errors.password="this password is incorrect"
    }

    if(err.code===11000){
        errors.email="this email already use"
        return errors
    }
    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message
        })
    }
    
    return errors
}
const maxAge=3*60*60*24
const createToken=(id)=>{
    return jwt.sign({id},"mohamed secret",{expiresIn:maxAge})
}

const loginGet=async(req,res)=>{
    res.render("login")
}
const signUpGet=async(req,res)=>{
    res.render("signup")
}



const loginPost=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.login(email,password)
        const token=createToken(user._id)
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(200).json({user:user._id})
    } catch (error) {
        const errors=handleErrors(error)
        res.status(400).json({errors})
    }

}



const signUpPost=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.create({email,password})
        const token=createToken(user._id)
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(201).json({user:user._id})
    } catch (error) {
        const  errors=handleErrors(error)
        res.status(400).json({errors})
    }
}

const logout_get=async(req,res)=>{
    res .cookie("jwt","",{maxAge:1})
    res.redirect("/")
}

module.exports={
    loginGet,signUpGet,loginPost,signUpPost,logout_get
}