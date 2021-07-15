const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  owner: {
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
  imageUrl : {
    type : String
  },
  createdAt : {
    type: Date,
    default : Date.now()
  },
  //whisillised by nu aaray
  wishListedBy: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  ],
})

const Book = mongoose.model('Book',BookSchema)

module.exports = Book;