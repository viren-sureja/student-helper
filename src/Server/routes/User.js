const express = require("express");
const router = express.Router();  
const { userRegister, userLogin } = require("../controllers/User.js");
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

module.exports = router;