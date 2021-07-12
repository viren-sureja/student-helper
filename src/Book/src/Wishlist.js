import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import BookNavbar from "./BookNavbar";

const useStyles = makeStyles((theme) => ({}));
const Wishlist = () => {
  const classes = useStyles();

  return (
    <div>
      <BookNavbar />
      Wishlist
    </div>
  );
};

export default Wishlist;
