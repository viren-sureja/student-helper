const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  requestedAt : {
    type: Date,
    default : Date.now()
  }
})

const Request = mongoose.model('Request',RequestSchema)

module.exports = Request;