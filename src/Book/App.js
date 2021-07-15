import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import AOS from "aos";
import Collection from "./Book/Collection/Collection";
import AddBook from "./Book/AddBook";
import Login from "./Auth/Login";
import Book from "./Book/Book";
import ContactUser from "./Book/ContactUser";
import "aos/dist/aos.css";
import Home from "./Home/Home";
import Trades from "./Book/Trade/Trades";
import BookInfo from "./Book/BookInfo";
import Request from "./Book/Request/Request";
import MyCollection from "./Book/Collection/MyCollection";
import Wishlist from "./Book/Wishlist/Wishlist";
import SignUp from "./Auth/SignUp";
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
          {/* <Route path="/mySent" exact component={MySent} /> */}
          {/* <Route path="/myReceived" exact component={MyReceived} /> */}
          <Route path="/request" exact component={Request} />
          <Route path="/myCollection" exact component={MyCollection} />
          <Route path="/wishlist" exact component={Wishlist} />
        </div>
      </Router>
    </div>
  );
};
export default App;
