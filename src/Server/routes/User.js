const express = require("express");
const router = express.Router();  
const { userRegister, userLogin, checkLogin, userInfo } = require("../controllers/User.js");
const Joi = require("joi");
const { getRecentUsers } = require("../controllers/Message.js");
const { auth } = require("../middleware/auth.js");



//roues for users
router.get("/test", (req,res) => {
  res.send("users  api accessed");
})
router.post("/register",userRegister);
router.post("/login",userLogin)
router.get("/recentUsers",auth,getRecentUsers)
router.get("/userInfo",auth,userInfo)

//route for just checking the auth
router.get("/checklogin",auth,checkLogin)

module.exports = router;