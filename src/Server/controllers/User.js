const User = require("../models/User.js");
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../validators/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.userRegister = async (req, res) => {
  //console.log(req.headers.noauth,req.body);
  console.log(req.body);

  const { error } = userRegisterValidator.validate(req.body);
  //console.log(error)

  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(402).send("email already exists");
  }

  //hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.send(error);
  }
};

module.exports.userLogin = async (req, res) => {
  //console.log(req.headers.noauth,req.body);
  //console.log(req.body);

  const { error } = userLoginValidator.validate(req.body);
  //console.log(error)

  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(402).send("email does not exists");
  }

  //validating the password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(403).send("password not correct");
  }
  console.log("here");
  //res.send("account verified")
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  //console.log(token,user._id)
  const userPresent = await User.findOne({ _id: user._id });
  if (!userPresent) {
    console.log("no present");
    return res.send("not present");
  }
  res.header("auth-token", token).send({ token: token, user: user._id });
};

module.exports.checkLogin = async (req, res) => {
  res.send("succesfully logged in");
};
