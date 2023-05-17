const express=require("express")
const {loginGet,signUpGet,loginPost,signUpPost,logout_get}=require("../controllers/authController")

const router=express.Router()

router.route("/login").get(loginGet).post(loginPost)
router.route("/signup").get(signUpGet).post(signUpPost)
router.route("/logout").get(logout_get)


module.exports=router