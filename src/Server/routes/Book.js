const express = require("express");
const router = express.Router();  

const {auth} = require("../middleware/auth.js")
const { addBook, collection, addToWishList, removeFromWishList, getWishList, userCollection, deleteBook, bookInfo } = require("../controllers/Book.js");
const { addRequest, getMySentRequest, getMyReceivedRequest, deleteRequest, confirmRequest } = require("../controllers/Request.js");
const { getTrade } = require("../controllers/Trade.js");
const { getMessage, addMessage } = require("../controllers/Message.js");


//roues for books
router.get("/test", auth , (req,res) => {
  res.send("books  api accessed");
})

router.post("/addBook",auth,addBook)
router.get("/userCollection",auth,userCollection)
router.get("/collection",collection)
router.delete("/deleteBook",auth,deleteBook)
router.get("/bookInfo",bookInfo)

//routes for requests
router.post("/addRequest",auth, addRequest)
router.get("/mySentRequest", auth, getMySentRequest)
router.get("/myReceivedRequest", auth, getMyReceivedRequest)
router.delete("/deleteRequest", auth,deleteRequest)
router.post("/confirmRequest", auth,confirmRequest)

//routes for trades
router.get("/getTrade",auth,getTrade)

//routes for messages
router.post("/addMessage",auth,addMessage);
router.get("/getMessage",auth,getMessage);

//routes for wishlist
router.post("/addToWishList",auth,addToWishList);
router.post("/removeFromWishList",auth,removeFromWishList);
router.get("/getWishList",auth,getWishList)


module.exports = router;