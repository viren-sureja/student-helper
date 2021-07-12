import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import AOS from "aos";
import Collection from "./Collection";
import AddBook from "./AddBook";
import Login from "./Login";
import Book from "./Book";
import ContactUser from "./ContactUser";
import "aos/dist/aos.css";
import Home from "./Home";
import Trades from "./Trades";
import BookInfo from "./BookInfo";
import MySent from "./MySent";
import MyReceived from "./MyReceived";
import Request from "./Request";
import MyCollection from "./MyCollection";
import Wishlist from "./Wishlist";
import SignUp from "./SignUp";
const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
    });
  }, []);
  return (
    <div>
      <Router history={history}>
        <div>
          <Route path="/collection" exact component={Collection} />
          <Route path="/addBook" exact component={AddBook} />
          <Route path="/login" exact component={Login} />
          <Route path="/signUp" exact component={SignUp} />
          <Route path="/contactUser" exact component={ContactUser} />
          <Route path="/" exact component={Home} />
          <Route path="/book" exact component={Book} />
          <Route path="/chat" exact component={ContactUser} />
          <Route path="/trades" exact component={Trades} />
          <Route path="/bookInfo" exact component={BookInfo} />
          <Route path="/mySent" exact component={MySent} />
          <Route path="/myReceived" exact component={MyReceived} />
          <Route path="/request" exact component={Request} />
          <Route path="/myCollection" exact component={MyCollection} />
          <Route path="/wishlist" exact component={Wishlist} />
        </div>
      </Router>
    </div>
  );
};
export default App;
