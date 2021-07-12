import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import BookNavbar from "./BookNavbar";

const useStyles = makeStyles((theme) => ({}));
const MyCollection = () => {
  const classes = useStyles();

  return (
    <div>
      <BookNavbar />
      MyCollection
    </div>
  );
};

export default MyCollection;
