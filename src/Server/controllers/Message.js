const Message = require("../models/Message");
const { getMessageValidator } = require("../validators/Message");

module.exports.addMessage = async (req, res) => {
  //res.send("adding of message is accesible")
  const message = new Message({
    receiver: req.body.receiver,
    sender: req.user._id,
    content: req.body.content,
  });

  try {
    const savedMessage = await message.save();
    res.send(savedMessage);
  } catch (error) {
    res.send(error);
  }
};

module.exports.getMessage = async (req, res) => {
  //res.send("get of message is accesible")

  const { error } = getMessageValidator.validate(req.query);
  //console.log(error)
  //console.log(req.query.id)
  if (error) return res.status(400).send(error.details[0].message);

  const messages = await Message.find({
    $or: [
      { sender: req.query.id, receiver: req.user._id },
      { sender: req.user._id, receiver: req.query.id },
    ],
  });
  // console.log(messages)
  // console.log(req.user._id)
  // console.log(req.body.id)
  // const allmessages = await Message.find()
  // console.log(allmessages)
  //console.log(messages)
  res.send(messages);
};

module.exports.getRecentUsers = async (req, res) => {
  // res.send("getRequestUser accesible")
  // console.log(req.user)
  // req.user._id = "60d01f82537f163c8c9eea1f"

  var recentusers1 = await Message.distinct("receiver", {
    sender: req.user._id,
  });
  var recentusers2 = await Message.distinct("sender", {
    receiver: req.user._id,
  });
  // console.log(recentusers1,recentusers2)

  for (var i = 0; i < recentusers2.length; ++i) {
    recentusers2[i] = String(recentusers2[i]);
  }
  for (var i = 0; i < recentusers1.length; ++i) {
    recentusers1[i] = String(recentusers1[i]);
  }
  var arr = recentusers2.concat(recentusers1);
  var mySet = new Set(arr);
  var filteredArray = Array.from(mySet);
  // console.log(filteredArray, "filtererd")
  res.send(filteredArray);

  // var justfinding = await Message.find({sender : filteredArray[0]})
  // console.log(justfinding, "justfinding")

  // var d = []
  // for(var i=0;i<recentusers2.length;++i){
  //   d.push(recentusers2[i])
  // }
  // console.log(d)

  // var f=0;
  // for(var i=0;i<recentusers1.length;++i){
  //   f = 0;
  //   for(var j=0;j<recentusers2.length;++j){
  //     if(String(recentusers1[i]).localeCompare(String(recentusers2[j])) === 0){
  //       ++f;
  //       break;
  //     }
  //   }
  //   if(f==0){
  //     d.push(recentusers1[i])
  //   }
  // }
  // // console.log(f,"ffff")
  // res.send(d)
};
