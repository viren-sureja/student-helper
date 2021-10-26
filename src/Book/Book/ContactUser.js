import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BookNavbar from "./BookNavbar";
import ChatForm from "./ChatForm";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import axios from "../axios";
import { Link as LinkS, animateScroll } from "react-scroll";
import { io } from "socket.io-client";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import SendIcon from "@material-ui/icons/Send";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Drawer from "@material-ui/core/Drawer";
import RecentUsers from "./RecentUsers/RecentUsers";
import { getRecentUsers } from "../actions/recentUsersAction";
import history from "../history";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import CustomizedSnackbars from "../CustomizedSnackbars";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  chatSection: {
    width: "100%",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  recentUsers: {
    overflowY: "auto",
  },
  itemText: {
    marginLeft: "-12px",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    overflowY: "auto",
  },
  closeMenuButton: {
    display: "flex",
    alignSelf: "center",
  },
}));

const ContactUser = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  useEffect(() => {
    setMobileOpen(false);
  }, [isMobile]);
  var curr_name = localStorage.getItem("user_name");
  // localStorage.removeItem("props.location.state.ownerId");
  const [id, setId] = useState(props.match.params.id);
  const [name, setName] = useState(null);
  const [messages, SetMessages] = useState([]);
  const [currentContent, setcurrentContent] = useState("");
  const scrollRef = useRef();
  const socket = useRef();
  const [open, setOpen] = React.useState(false);
  const currentUserId = localStorage.getItem("user_id");
  var snackbarMessage = "other user!";
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const mounted = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //alert(`Submitting currentContent ${currentContent}`)
    onSendButton(currentContent);
    setcurrentContent("");
  };
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
    } else {
      console.log(messages);
    }
  });

  useEffect(() => {
    props.getRecentUsers();
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
      if (!(data.senderId === id)) {
        snackbarMessage = String(data.senderName);
        handleClick();
        console.log(snackbarMessage);
        return;
      }
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
    const fetchUserDetails = async () => {
      console.log("lol");
      try {
        const token = localStorage.getItem("user");
        const response = await axios.get("/users/userInfo", {
          headers: {
            "auth-token": token,
          },
          params: {
            _id: id,
          },
        });
        console.log(response.data);
        setName(response.data.name);
      } catch (e) {
        console.log(e);
        console.log(e.response.data);
        if (
          e.response.data === "Invalid Token" ||
          e.response.data === "Access denied"
        ) {
          history.push("/login");
        }
      }
    };
    fetchUserDetails();
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
      senderName: name,
      text: content,
    });
    const newMesage = {
      sender: currentUserId,
      receiver: id,
      content: content,
      createdAt: Date.now(),
    };
    console.log(content);
    const token = localStorage.getItem("user");
    const response = await axios.post(
      "/books/addMessage",
      { receiver: id, content: content },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );

    //console.log(response)
    SetMessages((prev) => [...prev, newMesage]);
  };

  const renderMessages = () => {
    return messages.map((response) => {
      return (
        <div ref={scrollRef}>
          <Paper style={{ margin: "10px" }} elevation={3}>
            <ListItem
              key={response._id}
              style={{
                backgroundColor: `${
                  response.sender === id ? "#E5FBB8" : "#F5E79D"
                }`,
              }}
            >
              {response.sender === id ? (
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
              ) : null}

              {/* <Grid container justify="center" alignItems="center"> */}
              <ListItemText
                // style={{ backgroundColor: "black" }}
                align={`${response.sender === id ? "left" : "right"}`}
                primary={response.content}
                secondary={response.createdAt}
                style={{
                  marginRight: `${response.sender === id ? null : "15px"}`,
                }}
              />

              {response.sender === id ? null : (
                <ListItemSecondaryAction>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/2.jpg"
                  />
                </ListItemSecondaryAction>
              )}
              {/* <ListItemText
                  align={`${response.sender === id ? "left" : "right"}`}
                  secondary={response.createdAt}
                /> */}
              {/* </Grid> */}
            </ListItem>
          </Paper>
        </div>
      );
    });
  };
  const recentUsers = (
    <div className={classes.recentUsers}>
      <List>
        <ListItem button key="RemySharp">
          <ListItemIcon>
            <Avatar
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            />
          </ListItemIcon>
          <ListItemText primary={curr_name}></ListItemText>
        </ListItem>
      </List>
      <Divider />

      <List>
        {props.recentUsers ? (
          props.recentUsers.map((user) => {
            return (
              <ListItem
                button
                key="RemySharp"
                component={Link}
                to={{
                  pathname: `/userProfile/${user._id}`,
                }}
              >
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText
                  // component={Link}
                  // to={{
                  //   pathname: `/userProfile/${user._id}`,
                  // }}
                  primary={user.name}
                ></ListItemText>
              </ListItem>
              // <Grid item key={user._id}>
              //   <Button
              //     variant="contained"
              //     color="primary"
              //     component={Link}
              //     // to={`/chat/:${user._id}`}
              //     // to={{
              //     //   pathname: "/userProfile",
              //     //   state: {
              //     //     owner: user._id,
              //     //     ownerName : user.name
              //     //   }
              //     // }}
              //     to={{
              //       pathname: `/userProfile/${user._id}`,
              //     }}
              //   >
              //     Contact {user.name}
              //   </Button>
              // </Grid>
            );
          })
        ) : (
          <CircularProgress />
        )}
        {/* <ListItem button key="RemySharp">
          <ListItemIcon>
            <Avatar
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            />
          </ListItemIcon>
          <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
        </ListItem> */}
      </List>
    </div>
  );
  return (
    <div>
      <BookNavbar />
      <div
        style={{
          marginInline: `${isMobile ? "5px" : "30px"}`,
          marginBlock: `${isMobile ? "5px" : "10px"}`,
        }}
      >
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} md={3}>
            <Typography variant="h5" className="header-message">
              {isMobile ? (
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              ) : null}
              Recent Chats
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <List dense style={{ marginTop: `${isMobile ? "-15px" : ""}` }}>
              <ListItem>
                <ListItemIcon>
                  <Avatar
                    alt="Alice"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary={name} className={classes.itemText} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <IconButton
                onClick={handleDrawerToggle}
                className={classes.closeMenuButton}
              >
                <CloseIcon />
              </IconButton>
              <div style={{ paddingTop: "50px" }}>{recentUsers}</div>
            </Drawer>
          ) : (
            <Grid item xs={3} className={classes.borderRight500}>
              {recentUsers}
            </Grid>
          )}

          <Grid item xs={12} md={9}>
            <List
              className={classes.messageArea}
              dense
              style={{
                height: `${isMobile ? "57vh" : "58vh"}`,
                width: "100%",
              }}
            >
              {renderMessages()}
            </List>
            <Divider />

            <form
              onSubmit={handleSubmit}
              style={{ width: "100%" }}
              autoComplete="off"
            >
              <Grid container style={{ padding: "20px" }}>
                <Grid item xs={9}>
                  <TextField
                    id="outlined-basic-email"
                    label="Type Message"
                    variant="outlined"
                    type="text"
                    name="Type Message"
                    value={currentContent}
                    onChange={(e) => setcurrentContent(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid xs={1} align="right" style={{ marginLeft: "15px" }}>
                  <Fab color="primary" aria-label="add" type="submit">
                    <SendIcon />
                  </Fab>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        {/* <div style={{ height: "300px", width: "100%", overflow: "scroll" }}>
          
        </div> */}
        {/* <ChatForm onSendButton={onSendButton} /> */}
        {/* <RecentUsers /> */}
        <Snackbar
          className={classes.root}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="info">
            There is message from {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" />;
}

const mapStateToProps = (state) => {
  return {
    recentUsers: Object.values(state.recentUsers),
  };
};

export default connect(mapStateToProps, { getRecentUsers })(ContactUser);
