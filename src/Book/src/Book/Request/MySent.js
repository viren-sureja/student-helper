import React, { useEffect } from "react";
import BookCard from "../Card/BookCard";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { deleteRequest, mySent } from "../../actions/requestAction";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import BookNavbar from "../BookNavbar";
const useStyles = makeStyles((theme) => ({}));

const MySent = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.mySent();
  }, []);

  const card = ({ book, from, to, _id }) => {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Book_id - {book._id}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Book_title - {book.title}
          </Typography>
          <Typography variant="h5" gutterBottom>
            From - {from}
          </Typography>
          <Typography variant="h5" gutterBottom>
            To - {to}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Accept</Button> */}
          <Button
            size="small"
            onClick={() => {
              props.deleteRequest(_id);
            }}
          >
            Cancel
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
            {/* {card(mySent)} */}
            <BookCard
              bookName="Harry Potter"
              bookDescription="Want to buy or sell some college stuff or books, StudentHelper store is a place of your need. Here you can buy from peers or sell to peers and can save money, also by reusing stuff make some contribution towards the healthy environment because every step counts."
              photo="./images/Book3.jpg"
              date="9 July, 2021"
              owner="Dharansh"
              price="123"
              reqDate="9 July, 2021"
              to="Shivam"
              from=""
              tradeDate=""
            />
          </Grid>
          {/* {props.mySentReq.map((mySent) => {
            return (
              <Grid item key={mySent._id}>
                {card(mySent)}
                <BookCard
                  bookName="Harry Potter"
                  bookDescription="Want to buy or sell some college stuff or books, StudentHelper store is a place of your need. Here you can buy from peers or sell to peers and can save money, also by reusing stuff make some contribution towards the healthy environment because every step counts."
                  photo="./images/Book3.jpg"
                  date="9 July, 2021"
                  owner="Dharansh"
                  price="123"
                  reqDate="9 July, 2021"
                  to="Shivam"
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
    mySentReq: Object.values(state.sentRequest),
  };
};

export default connect(mapStateToProps, { mySent, deleteRequest })(MySent);
