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
  toName : {
    type : String,
    required : true
  },
  fromName : {
    type : String,
    required : true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  tradedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Trade = mongoose.model("Trade", TradeSchema);

module.exports = Trade;
