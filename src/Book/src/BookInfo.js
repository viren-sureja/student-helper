import React ,{ useContext, useEffect, useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Navbar from "./Navbar";
import Button from '@material-ui/core/Button';
import axios from "./axios";
import history from "./history";



const BookInfo = (props) => {

  const currentUserId = localStorage.getItem("user_id")

  const [book,setBook] = useState(props.location.state.book)

  useEffect(() => {
    console.log(book)
    // console.log(props.location.state.book)
  },[])

  const renderInfo = () => {
    // console.log(book)
    return (
      <div>
      <Typography variant="subtitle1">
        OwnerId - {book.owner}
      </Typography>
      <Typography variant="subtitle1">
        ownerName - {book.ownerName}
      </Typography>
      <Typography variant="subtitle1">
        category - {book.category}
      </Typography>
      <Typography variant="subtitle1">
        title - {book.title}
      </Typography>
      <Typography variant="subtitle1">
        sellingPrice - {book.sellingPrice}
      </Typography>
      <Typography variant="subtitle1">
        description - {book.description}
      </Typography>
      <img
        src= {book.imageUrl ? book.imageUrl : "./images/book.jpg"}  
        width="200"
        height="250"
        alt="Book"
      />
      <br/>
      <Button variant="contained" color="primary" onClick = {() => addRrquestButton()}>
        Add Request
      </Button>
    </div>
    
    )
  }

  const addRrquestButton = async () => {
    
    try {
      const token = localStorage.getItem("user");
      const response = await axios.post(
        "/books/addRequest",
        JSON.stringify({
          to : book.owner,
          book : book._id
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      )
      // console.log("hii")
      console.log(response)
      history.push("/mySent");
    } catch (error) {
      console.log(error.response)
      alert(error.response ? error.response.data : 'error in posting request')
    }
  }

  return (
    <div>
      <Navbar />
      <div style={{ margin: "30px" }}>
        <>
          <h1>hi from book Info</h1>
        </>
        <>
          {renderInfo()}
        </>
      </div>
    </div>
  );
};

export default BookInfo;