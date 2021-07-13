const Book = require("../models/Book.js")
const Request = require("../models/Request.js")
const Trade = require("../models/Trade.js")
const { addRequestValidator } = require("../validators/Request.js")


module.exports.addRequest = async (req,res) => {

  //res.send("mucollection route accessed")
  console.log(req.user._id)
  console.log(req.body)
  //res.send("Request accesed")

  const { error } = addRequestValidator.validate(req.body)
  //console.log(error)

  if(error) return res.status(400).send(error.details[0].message)
  
  //res.send("Request validated")
  
  //find if there is a request present or not
  const exist = await Request.findOne({
    from:req.user._id,
    to:req.body.to,
    book:req.body.book})
  
  if(exist) return res.status(400).send("already requested")
  

  //res.send("will request soon")
  
  const validbook = await Book.findOne({_id : req.body.book })

  if(!validbook){
    return res.status(400).send("book does not exist")
  }

  const request = new Request({
    from : req.user._id,
    to : req.body.to,
    book : req.body.book,
  })

  try {
    const savedRequest = await request.save();
    res.send(savedRequest)
  } catch (error) {
    res.send(error)
  }

}

module.exports.getMySentRequest = async (req,res) => {

  //res.send("getMysentRequest accessed")

  const sentrequests = await Request.find({from:req.user._id})

  for(var i=0;i<sentrequests.length;++i){
    const book = await Book.findOne({_id : sentrequests[i].book})
    sentrequests[i].book = book
  }
  console.log(sentrequests)
  res.send(sentrequests)

}

module.exports.getMyReceivedRequest = async (req,res) => {

  //res.send("getMyReceivedRequest accessed")

  var receivedtrequests = await Request.find({to:req.user._id})

  for(var i=0;i<receivedrequests.length;++i){
    const book = await Book.findOne({_id : receivedrequests[i].book})
    receivedrequests[i].book = book
  }
  console.log(receivedrequests)
  res.send(receivedrequests)

}

module.exports.deleteRequest = async (req,res) => {
  //res.send("accsible")
  const result = await Request.deleteOne({ id: req.id });
  console.log(result)
  res.send("deleted")
}

module.exports.confirmRequest = async (req,res) => {

  console.log(req.body.id)
  var request = await Request.find({ _id : req.body.id})
  console.log(request,"reqqq")
  if(!request.length) return res.status(400).send("no request found")
  request = request[0]
  book = await Book.find({ _id : request.book })
  if(!book.length) return res.status(400).send("no book found")
  console.log(book)
  book = book[0]
  console.log(book)

  console.log(req.user._id,book.owner)
  if((req.user._id)!=(book.owner)){
    return res.send("you are not owner of book so you cannot confirm request")
  }
  const trade = new Trade({
    to : request.from,
    from : req.user._id,
    ownerName : book.ownerName,
    title : book.title,
    category : book.category,
    sellingPrice : book.sellingPrice,
    description : book.description
  })
  savedTrade = null
  try {
    savedTrade = await trade.save();
  } catch (error) {
    res.send(error)
  }

  const result1 = await Request.find({ book : book._id }).remove().exec();
  console.log(result1)

  const result2 = await Book.find({ _id:book._id }).remove().exec();
  console.log(result2)
  res.send(savedTrade)
}
