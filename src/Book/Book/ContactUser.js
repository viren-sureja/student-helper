import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Navbar from "../Home/HomeComponents/Navbar";
import ChatForm from "./ChatForm";
import axios from "../axios";
import { io } from "socket.io-client";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CustomizedSnackbars from "../CustomizedSnackbars";

const ContactUser = (props) => {
  var owner = localStorage.getItem("owner");
  // localStorage.removeItem("owner");
  const [id, setId] = useState(owner);
  const [messages, SetMessages] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();
  const currentUserId = localStorage.getItem("user_id");

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
    } else {
      console.log(messages);
    }
  });

  useEffect(() => {
    setId(id);
    return function cleanup() {
      console.log("routes has chnages now its time for disconnection");
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.emit("addUser", currentUserId);
    socket.current.on("getMessage", (data) => {
      // setArrivalMessage({
      //   sender: data.senderId,
      //   text: data.text,
      //   createdAt: Date.now(),
      // });

      // if(!(data.senderId === id)){
      //   <CustomizedSnackbars />
      // return
      // }

      const arrivedMessage = {
        content: data.text,
        receiver: currentUserId,
        sender: data.senderId,
        createdAt: Date.now(),
      };
      console.log(data);
      console.log(messages);
      console.log(arrivedMessage);
      SetMessages((prev) => [...prev, arrivedMessage]);
      // SetMessages([...messages,arrivedMessage])
      //console.log(data)
    });

    async function fetchMessage() {
      const token = localStorage.getItem("user");
      const response = await axios.get("/books/getMessage", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        params: {
          id: id,
        },
      });
      //console.log(response)
      SetMessages(response.data);
    }
    console.log(messages);
    fetchMessage();
    console.log(messages);
  }, [id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSendButton = async (content) => {
    //console.log("here i am in the props function")

    socket.current.emit("sendMessage", {
      senderId: currentUserId,
      receiverId: id,
      text: content,
    });
    console.log(content);
    const token = localStorage.getItem("user");
    const response = await axios.post(
      "/books/addMessage",
      { receiver: owner, content: content },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );

    //console.log(response)
    SetMessages([...messages, response.data]);
  };

  const renderMessages = () => {
    return messages.map((response) => {
      return (
        <div
          ref={scrollRef}
          style={{
            border: "5px solid red",
            padding: "10px",
            color: response.sender === id ? "green" : "blue",
            textAlign: response.sender === id ? "left" : "right",
          }}
        >
          <h1>Content : {response.content}</h1>
          <h2>sender : {response.sender}</h2>
          <h3>receiver : {response.receiver}</h3>
          <h4>date : {response.createdAt}</h4>
        </div>
      );
    });
  };

  return (
    <div>
      <Navbar />
      <div style={{ margin: "30px" }}>
        <Typography variant="subtitle1">OwnerId - {owner}</Typography>
        <>
          <h1>all messages</h1>
        </>
        <div style={{ height: "300px", width: "100%", overflow: "scroll" }}>
          {renderMessages()}
        </div>
        <ChatForm onSendButton={onSendButton} />
      </div>
    </div>
  );
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" />;
}

export default ContactUser;
