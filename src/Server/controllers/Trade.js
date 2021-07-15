const Book = require("../models/Book.js");
const Request = require("../models/Request.js");
const Trade = require("../models/Trade.js");

module.exports.getTrade = async (req, res) => {
  console.log("get on trade is aacessible");
  // req.user._id = "60d01f82537f163c8c9eea1f"
  const trades = await Trade.find({
    $or: [{ to: req.user._id }, { from: req.user._id }],
  });
  // console.log(trades)
  // const alltrades = await Trade.find()
  // console.log(alltrades)
  // console.log(req.query)
  for (var i = 0; i < trades.length; ++i) {
    const book = await Book.findOne({ _id: trades[i].book });
    trades[i].book = book;
  }
  res.send(trades);
};
