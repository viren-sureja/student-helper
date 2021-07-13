import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getTrade } from "../../actions/getTradeAction";
import BookNavbar from "../BookNavbar";
import BookCard from "../Card/BookCard.js";
const useStyles = makeStyles((theme) => ({
  addBook: {
    display: "flex",
    justifyContent: "center",
  },
  main: {
    margin: "10px",
  },
  root: {
    maxWidth: 250,
  },
  center: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));
const Trades = (props) => {
  useEffect(() => {
    props.getTrade();
    console.log(props);
  }, []);
  const classes = useStyles();

  const card = ({
    title,
    category,
    sellingPrice,
    description,
    owner,
    imageUrl,
  }) => {
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <img
              className={classes.center}
              src={imageUrl ? imageUrl : "./images/book.jpg"}
              width="200"
              height="250"
              alt="Book"
            />
            <Grid
              style={{ marginBlock: "10px" }}
              container
              justify="center"
              alignItems="center"
              alignContent="space-between"
            >
              <Grid item xs={6}>
                <Typography gutterBottom variant="h5" component="h2" noWrap>
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="right"
                >
                  ${sellingPrice}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="subtitle1" color="textSecondary" noWrap>
              {category}
            </Typography>
            <Typography variant="body2" color="textSecondary" noWrap>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };
  return (
    <div>
      <BookNavbar />
      <div className={classes.main}>
        <div>
          <Grid
            container
            justify="center"
            alignItems="center"
            // spacing={3}
            // style={{ marginBlock: "10px" }}
          >
            <Grid item>
              <BookCard
                bookName="Jain and Jain"
                bookDescription="Have a question, have an idea, wants to get updated with ongoing events in the university, or want to interact with peers and grow a network within a university, StudentHelper network is the answer to these questions. Explore now and enhance your college journey."
                photo="./images/Book1.jpg"
                date="9 July, 2021"
                owner="Shivam Bhalodia"
                price="123"
                reqDate=""
                to="Shivam"
                from="Dharansh"
                tradeDate="9 July, 2021"
              />
            </Grid>
            {/* {props.trades.map((trade) => {
              return (
                <Grid item key={trade._id}>
                  {card(trade)}
                </Grid>
              );
            })} */}
          </Grid>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trades: Object.values(state.trades),
  };
};

export default connect(mapStateToProps, { getTrade })(Trades);
