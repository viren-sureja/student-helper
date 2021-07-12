import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getCollection } from "./actions/getCollectionAction";
import ContactUser from "./ContactUser";
import BookNavbar from "./BookNavbar";
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
const Collection = (props) => {
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    const timeOutCallback = (params) => {
      // setFilteredCollection(props.collection)
      console.log(params);
      // console.log(filteredCollection)
    };

    console.log(
      "hii from initial use effect of collection before getcollectionaction"
    );
    props.getCollection(setFilteredCollection);
    setTimeout(() => timeOutCallback(props.collection), 2000);
    console.log(props.collection);
    console.log("hii from initial use effect of collection");
    // setFilteredCollection(props.collection)
    // console.log(filteredCollection)
  }, []);

  const classes = useStyles();

  const card = (book) => {
    const { title, category, sellingPrice, description, owner, imageUrl } =
      book;
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
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button
            component={Link}
            to={{
              pathname: "/bookInfo",
              state: {
                book: book,
              },
            }}
            size="small"
            color="primary"
          >
            Book Info
          </Button>
          <Button
            component={Link}
            to={{
              pathname: "/chat",
              state: {
                ownerId: owner,
              },
            }}
            size="small"
            color="primary"
          >
            Chat with User
          </Button>
        </CardActions>
      </Card>
    );
  };

  const handleSearch = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  useEffect(() => {
    if (firstTime) {
      setFirstTime(false);
      return;
    }
    console.log("is it coming here???");
    const timerId = setTimeout(() => {
      let value = searchInput;
      let result = [];
      console.log(value);
      // if(value === "" ){
      //   setFilteredCollection(props.collection)
      //   return
      // }
      result = props.collection.filter((data) => {
        return (
          data.title.toLowerCase().search(value) != -1 ||
          data.description.toLowerCase().search(value) != -1
        );
      });
      setFilteredCollection(result);

      console.log(filteredCollection);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchInput]);

  return (
    <div>
      <BookNavbar />
      <div className={classes.main}>
        <div className={classes.addBook}>
          <Button
            component={Link}
            to="/addBook"
            variant="outlined"
            style={{ color: "green" }}
            startIcon={<AddIcon style={{ fontSize: "15px" }} />}
          >
            Add Book
          </Button>
        </div>
        <div>
          <div>
            <label>Search:</label>
            <input
              type="text"
              value={searchInput}
              onChange={(event) => handleSearch(event)}
            />
          </div>
          <Grid
            container
            justify="center"
            alignItems="center"
            spacing={3}
            style={{ marginBlock: "10px" }}
          >
            {filteredCollection.map((collection) => {
              return (
                <Grid item key={collection._id}>
                  {card(collection)}
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    collection: Object.values(state.collection),
  };
};

export default connect(mapStateToProps, { getCollection })(Collection);
