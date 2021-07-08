const Book = require("../models/Book.js");
const User = require("../models/User.js");

const { addBookValidator } = require("../validators/Book.js");


module.exports.addBook = async (req,res) => {

  //res.send("add route accessed")
    console.log(req.body)
    const { error } = addBookValidator.validate(req.body)
    //console.log(error)

    if(error) return res.status(400).send(error)
    
    //console.log(req.user._id)

    //finnding the name of the owner
    const tuple = await User.findById(req.user._id)
    //console.log(tuple.name)

    const book = new Book({
      owner : req.user._id,
      ownerName : tuple.name,
      title : req.body.title,
      category : req.body.category,
      sellingPrice : req.body.sellingPrice,
      description : req.body.description,
      imageUrl : req.body.imageUrl
    })

    try {
      const savedBook = await book.save();
      res.send(savedBook)
    } catch (error) {
      res.send(error)
    }
    
}


module.exports.myCollection = async (req,res) => {

    // console.log("mucollection route accessed")
    // console.log(req.user._id)
    // const allbooks = await Book.find()
    // console.log(allbooks)
    const mybooks = await Book.find({owner : req.user._id})
    // console.log(mybooks)
    res.send(mybooks)
}

module.exports.collection = async (req,res) => {

  //res.send("mucollection route accessed")
  // console.log(req.user._id)
  
  mybooks = await Book.find({owner: {$ne: req.user._id}})

  res.send(mybooks)
}