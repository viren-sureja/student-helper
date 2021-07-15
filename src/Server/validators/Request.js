const Joi  = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

exports.addRequestValidator = Joi.object({
  to : Joi.objectId(),
  book : Joi.objectId(),
})