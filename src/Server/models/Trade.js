const mongoose = require("mongoose");

const TradeSchema = mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ownerName: {
    type: String,
    required: true,
  },
  title : {
    type: String,
    required : true
  },
  category : {
    type: String,
    required : true
  },
  sellingPrice : {
    type: Number,
    required : true
  },
  description : {
    type: String,
    required : true
  },
  tradedAt : {
    type: Date,
    default : Date.now()
  }
})

const Trade = mongoose.model('Trade',TradeSchema)

module.exports = Trade;