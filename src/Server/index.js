const express = require('express')
const connectDB = require('./config/db.js')
const dotenv = require("dotenv")
const cors = require("cors")
const { response } = require('express')


dotenv.config()

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors());

connectDB();

app.use(express.urlencoded({ limit: "30mb", extended: true}));
app.use(express.json({ limit: "30mb" , extended: true}));

app.use("/books/", require("./routes/Book.js"));
app.use("/users/", require("./routes/User.js"));

app.get("/",(req,res) => {
  res.send("backend is accesible")
})

var server = app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT}`
  )
);

options = {
  cors: true,
  origins: ["http://localhost:3000"],
};
const io = require("socket.io")(server, options);

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log(users)
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text, senderName }) => {
    //console.log(receiverId)
    const user = getUser(receiverId);
    //console.log("this is user",users)
    if(!user) {
      console.log("samne wala online nahi hai")
      return
    }
    console.log("this is reciever",users)
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
      senderName,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    console.log(users)
  });
  // socket.on("mannual disconnect", (userId) => {
  //   const user = getUser(userId);
  //   console.log("user to be removed",user)
  //   console.log("a user disconnected!");
  //   removeUser(user.socketId);
  // });
});
