const Joi  = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

exports.getMessageValidator = Joi.object({
  id : Joi.objectId(),
})
