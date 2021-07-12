import React, { useEffect } from "react";
import BookCard from "./BookCard";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  myReceived,
  confirmRequest,
  deleteRequest,
} from "./actions/requestAction";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "./Navbar";
import BookNavbar from "./BookNavbar";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({}));

const MyReceived = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.myReceived();
  }, []);

  const card = ({ book, from, to, _id }) => {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Book - {book}
          </Typography>
          <Typography variant="h5" gutterBottom>
            From - {from}
          </Typography>
          <Typography variant="h5" gutterBottom>
            To - {to}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              props.confirmRequest(_id);
            }}
          >
            Accept
          </Button>
          <Button
            size="small"
            onClick={() => {
              props.deleteRequest(_id);
            }}
          >
            Reject
          </Button>
        </CardActions>
      </Card>
    );
  };
  return (
    <div>
      <BookNavbar />
      <div>
        <Grid
          container
          justify="center"
          alignItems="center"
          // spacing={3}
          // style={{ marginBlock: "10px" }}
        >
          <Grid item>
            {/* {card(myReceived)} */}
            <BookCard
              bookName="Jain and Jain"
              bookDescription="Have a question, have an idea, wants to get updated with ongoing events in the university, or want to interact with peers and grow a network within a university, StudentHelper network is the answer to these questions. Explore now and enhance your college journey."
              photo="./images/Book1.jpg"
              date="9 July, 2021"
              owner="Shivam Bhalodia"
              price="123"
              reqDate="9 July, 2021"
              to=""
              from="Dharansh"
              tradeDate=""
            />
          </Grid>
          {/* {props.myReceivedReq.map((myReceived) => {
            return (
              <Grid item key={myReceived._id}>
                {card(myReceived)}
                <BookCard
                  bookName="Jain and Jain"
                  bookDescription="Have a question, have an idea, wants to get updated with ongoing events in the university, or want to interact with peers and grow a network within a university, StudentHelper network is the answer to these questions. Explore now and enhance your college journey."
                  photo="./images/Book1.jpg"
                  date="9 July, 2021"
                  owner="Shivam Bhalodia"
                  price="123"
                />
              </Grid>
            );
          })} */}
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myReceivedReq: Object.values(state.receivedRequest),
  };
};

export default connect(mapStateToProps, {
  myReceived,
  confirmRequest,
  deleteRequest,
})(MyReceived);
