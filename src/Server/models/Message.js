const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  sender : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content : {
    type: String,
    required : true
  },
  createdAt : {
    type: Date,
    default : Date.now()
  }
})

const Message = mongoose.model('Message',MessageSchema)

module.exports = Message;