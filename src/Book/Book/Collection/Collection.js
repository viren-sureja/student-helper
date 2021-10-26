import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getCollection } from "../../actions/getCollectionAction";
import ContactUser from "../ContactUser";
import BookNavbar from "../BookNavbar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import SchoolIcon from "@material-ui/icons/School";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import BookCard from "../Card/BookCard";
import { CircularProgress } from "@material-ui/core";
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
  const [allbook, setAllBook] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [firstTime, setFirstTime] = useState(true);
  const [sortType, setSortType] = useState(1);

  useEffect(() => {
    // console.log("hii from initial use effect of collection before getcollectionaction")
    props.getCollection(setFilteredCollection, setAllBook);
    // setTimeout(() => timeOutCallback(props.collection),2000)
    // console.log(props.collection)
    // console.log("hii from initial use effect of collection")
    // setFilteredCollection(props.collection)
    // console.log(filteredCollection)
  }, []);

  useEffect(() => {});

  const classes = useStyles();

  // to={{
  //   pathname: "/bookInfo",
  //   state: {
  //     book: book,
  //   },
  // }}

  const handleSearch = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSortType(event.target.value);
  };

  useEffect(() => {
    //changing first the all books
    if (sortType === 1) {
      const sorted = [...allbook].sort((b, a) => b.createdAt - a.createdAt);
      // sorted.reverse();
      console.log(sorted);
      setFilteredCollection(sorted);
    } else if (sortType === 2) {
      const sorted = [...allbook].sort((b, a) => b.createdAt - a.createdAt);
      sorted.reverse();
      console.log(sorted);
      setFilteredCollection(sorted);
    } else if (sortType === 3) {
      const sorted = [...allbook].sort(
        (b, a) => b.sellingPrice - a.sellingPrice
      );
      sorted.reverse();
      console.log(sorted);
      setFilteredCollection(sorted);
    } else if (sortType === 4) {
      const sorted = [...allbook].sort(
        (b, a) => b.sellingPrice - a.sellingPrice
      );
      // sorted.reverse();
      console.log(sorted);
      setFilteredCollection(sorted);
    }
    //then changing the inputu to same input so as the filtering is done properly in the sorted manner
  }, [sortType]);

  useEffect(() => {
    if (firstTime) {
      setFirstTime(false);
      return;
    }
    // console.log("is it coming here???")
    const timerId = setTimeout(() => {
      let value = searchInput;
      let result = [];
      console.log(value);
      // if(value === "" ){
      //   setFilteredCollection(props.collection)
      //   return
      // }
      result = allbook.filter((data) => {
        return (
          data.title.toLowerCase().search(value) != -1 ||
          data.description.toLowerCase().search(value) != -1
        );
      });
      setFilteredCollection(result);
      setSortType(1);
      console.log(filteredCollection);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchInput]);

  // useEffect(() => {
  //   console.log(allbook)
  //   console.log(filteredCollection)
  // },[allbook,filteredCollection])

  // console.log("all book = ",allbook)
  // console.log("filtered book = ",allbook)
  return (
    <div>
      <BookNavbar />
      <div className={classes.main}>
        <div>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ marginBlock: "10px" }}
          >
            <div style={{ margin: "10px" }}>
              <TextField
                id="searchInput"
                name="searchInput"
                type="text"
                label="Search:"
                value={searchInput}
                onChange={(event) => handleSearch(event)}
                variant="outlined"
              />
            </div>
            <div style={{ margin: "10px" }}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Sort Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortType}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Oldest To Newest</MenuItem>
                  <MenuItem value={2}>Newest To Oldest</MenuItem>
                  <MenuItem value={3}>High to Low</MenuItem>
                  <MenuItem value={4}>Low to high</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ margin: "10px" }}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  University
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortType}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Nirma University</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ margin: "10px" }}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortType}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>All</MenuItem>
                  <MenuItem value={2}>Books</MenuItem>
                  <MenuItem value={3}>Other Items</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            spacing={3}
            style={{ marginBlock: "10px" }}
          >
            {props.collection ? (
              filteredCollection.map((collection) => {
                return (
                  <Grid item key={collection._id}>
                    <BookCard book={collection} reqDate="" tradeDate="" />
                    {/* {card(collection)} */}
                  </Grid>
                );
              })
            ) : (
              <CircularProgress />
            )}
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
