const jwt = require("jsonwebtoken")

module.exports.auth = (req,res,next) => {

  const token = req.header('auth-token')
  //console.log(req.body)

  if(!token){
    return res.status(401).send("Access denied")
  }

  try {
    const verified = jwt.verify(token,process.env.SECRET_TOKEN)
    req.user = verified
    // console.log(verified,"console log at auth")
    next()
  } catch (error) {
    res.status(400).send("Invalid Token")
  }
}