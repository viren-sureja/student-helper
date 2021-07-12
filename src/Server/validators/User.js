const Joi  = require("joi")

exports.userRegisterValidator = Joi.object({
  name : Joi.string().min(6).required(),
  email : Joi.string().min(6).required().email(),
  password : Joi.string().min(6).required(),

})

exports.userLoginValidator = Joi.object({
  email : Joi.string().min(6).required().email(),
  password : Joi.string().min(6).required()
})
