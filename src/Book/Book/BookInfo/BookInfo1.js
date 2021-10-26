import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BookNavbar from "../BookNavbar";
import Button from "@material-ui/core/Button";
import axios from "../../axios";
import Grid from "@material-ui/core/Grid";
// import UserProfile from "./ContactUser/UserProfile";
import history from "../../history";
import { Link } from "react-router-dom";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import SendIcon from "@material-ui/icons/Send";
import SchoolIcon from "@material-ui/icons/School";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import BookIcon from "@material-ui/icons/Book";
import CreateIcon from "@material-ui/icons/Create";
import DescriptionIcon from "@material-ui/icons/Description";
import List from "@material-ui/core/List";
import BookInfoImage from "./BookInfoImage";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ListItem from "@material-ui/core/ListItem";
import CategoryIcon from "@material-ui/icons/Category";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  addtoWishList,
  removeFromWishList,
} from "../../actions/getWishListAction";
import { deleteInCollcetion } from "../../actions/getMyCollectionAction";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  itemText: {
    marginLeft: "-12px",
  },
  list: {},
}));

const BookInfo1 = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const currentUserId = localStorage.getItem("user_id");
  console.log(currentUserId);
  const [book, setBook] = useState(null);

  useEffect(() => {
    console.log(book);
    // console.log(props.location.state.book)
    const fetchBook = async () => {
      const token = localStorage.getItem("user");
      const currentUserId = localStorage.getItem("user_id");
      const response = await axios.get("/books/bookInfo", {
        params: {
          _id: props.match.params.id,
        },
        headers: {
          "auth-token": token,
        },
      });
      setBook(response.data);
    };
    fetchBook();
  }, []);

  useEffect(() => {
    console.log("book state changed");
    console.log(book);
  }, [book]);

  const addToWish = () => {
    console.log("add to wishlist");
    console.log(book.wishListedBy.concat([currentUserId]));
    console.log(book.wishListedBy);
    const updatedbook = {
      ...book,
      wishListedBy: book.wishListedBy.concat([currentUserId]),
    };
    props.addtoWishList(updatedbook);
    setBook(updatedbook);
  };
  // console.log("BookOwner", book.owner);
  const removeFromWish = () => {
    console.log("remove from wishlist");
    console.log(book.wishListedBy.filter((id) => id !== currentUserId));
    console.log(book.wishListedBy);
    props.removeFromWishList({
      ...book,
      wishListedBy: book.wishListedBy.filter((id) => id !== currentUserId),
    });
    setBook({
      ...book,
      wishListedBy: book.wishListedBy.filter((id) => id !== currentUserId),
    });
  };

  const addRequestButton = async () => {
    try {
      const token = localStorage.getItem("user");
      const response = await axios.post(
        "/books/addRequest",
        JSON.stringify({
          to: book.owner,
          book: book._id,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      // console.log("hii")
      console.log(response);
      history.push("/request");
    } catch (error) {
      console.log(error.response);
      alert(error.response ? error.response.data : "error in posting request");
    }
  };

  const classes = useStyles();
  return (
    <div>
      <BookNavbar />
      {book ? (
        <div
          style={{
            marginInline: `${isMobile ? "" : "30px"}`,
          }}
        >
          <Grid container justify="center" alignItems="center">
            <Grid
              container
              justify="center"
              alignItems="center"
              xs={12}
              md={10}
            >
              <Grid item md={6} style={{ marginTop: "30px" }}>
                <center>
                  <div>
                    <BookInfoImage imageUrl={book.imageUrl} />
                  </div>
                </center>
              </Grid>
              <Grid
                item
                md={6}
                style={{ paddingLeft: "5px", marginTop: "30px" }}
              >
                <List dense className={classes.list}>
                  <div>
                    <ListItem>
                      <ListItemIcon>
                        <BookIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Name"
                        secondary={`${book.title}`}
                        className={classes.itemText}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CreateIcon />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.itemText}
                        primary="Author/Publication"
                        secondary={`${book.title}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccountBalanceWalletIcon />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.itemText}
                        primary="Price"
                        secondary={`₹${book.sellingPrice}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MenuBookIcon />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.itemText}
                        primary="Edition"
                        secondary="Fourth"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CategoryIcon />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.itemText}
                        primary="Category"
                        secondary={`${book.category}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SchoolIcon />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.itemText}
                        primary="University"
                        secondary={`${book.category}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DescriptionIcon />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.itemText}
                        primary="Description"
                        secondary={`${book.description}`}
                      />
                    </ListItem>
                  </div>
                </List>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                  <Grid item style={{ margin: "10px" }}>
                    {book.owner === currentUserId ? null : (
                      <Button
                        type="submit"
                        variant="outlined"
                        startIcon={<SendIcon />}
                        onClick={() => addRequestButton()}
                      >
                        Add Request
                      </Button>
                    )}
                  </Grid>
                  <Grid item style={{ margin: "10px" }}>
                    {book.wishListedBy.includes(currentUserId) ? (
                      <Button
                        type="submit"
                        variant="outlined"
                        startIcon={<FavoriteIcon />}
                        onClick={() => removeFromWish()}
                      >
                        Remove from wishlist
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="outlined"
                        startIcon={<FavoriteIcon />}
                        onClick={() => addToWish()}
                      >
                        Add to wishlist
                      </Button>
                    )}
                  </Grid>
                  <Grid item style={{ margin: "10px" }}>
                    {book.owner === currentUserId ? (
                      <Button
                        variant="outlined"
                        startIcon={<ContactPhoneIcon />}
                        component={Link}
                        to={{
                          pathname: "/myCollection",
                          state: {},
                        }}
                      >
                        Contact Seller
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        startIcon={<ContactPhoneIcon />}
                        component={Link}
                        // to={{
                        //   pathname: "/userProfile",
                        //   state: {
                        //     owner: book.owner,
                        //     ownerName : book.ownerName
                        //   }
                        // }}
                        to={{
                          pathname: `/userProfile/${book.owner}`,
                        }}
                      >
                        Contact Seller
                      </Button>
                    )}
                  </Grid>
                  <Grid item style={{ margin: "10px" }}>
                    {book.owner === currentUserId ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => props.deleteInCollcetion(book)}
                      >
                        Delete Book
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default connect(null, {
  addtoWishList,
  removeFromWishList,
  deleteInCollcetion,
})(BookInfo1);
