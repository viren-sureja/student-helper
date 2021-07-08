const Joi  = require("joi")

exports.addBookValidator = Joi.object({
  title : Joi.string().min(6).required(),
  category : Joi.string().min(4).required(),
  sellingPrice : Joi.number().required(),
  description : Joi.string().min(10).required(),
  imageUrl : Joi.string().required()
})