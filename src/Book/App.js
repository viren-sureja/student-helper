import React, { useEffect } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import history from "./history";
import AOS from "aos";
import Collection from "./Book/Collection/Collection";
import AddBook from "./Book/AddBook";
import Login from "./Auth/Login";
import Book from "./Book/Book";
import ContactUser from "./Book/ContactUser";
import "aos/dist/aos.css";
import Home from "./Home/Home";
import UserProfile from "./Book/ContactUser/UserProfile";
import Trades from "./Book/Trade/Trades";
import BookInfo from "./Book/BookInfo";
import BookInfo1 from "./Book/BookInfo/BookInfo1";
import Request from "./Book/Request/Request";
import MyCollection from "./Book/Collection/MyCollection";
import Wishlist from "./Book/Wishlist/Wishlist";
import SignUp from "./Auth/SignUp";
// import Chat from "./Book/Chat/Chat";
import RecentUsers from "./Book/RecentUsers/RecentUsers";
import { connect } from "react-redux";
import { verifyLogin } from "./actions/authAction";
const App = (props) => {
  useEffect(async () => {
    AOS.init({
      duration: 1000,
      offset: 100,
    });
    // console.log("Hi");
    await props.verifyLogin();
  }, []);
  console.log("Hi", props.isSignedIn);
  return (
    <div>
      <Router history={history}>
        <div>
          <Route path="/collection" exact component={Collection} />
          {/* <Route path="/chat/:id" exact component={Chat} /> */}
          <Route path="/userProfile/:id" exact component={UserProfile} />
          <Route path="/recentUsers" exact component={RecentUsers} />
          <Route
            path="/addBook"
            exact
            render={() => {
              return props.isSignedIn !== false ? (
                <AddBook />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route path="/login" exact component={Login} />
          <Route path="/signUp" exact component={SignUp} />
          <Route path="/contactUser" exact component={ContactUser} />
          <Route path="/" exact component={Home} />
          <Route path="/book" exact component={Book} />
          <Route
            path="/chat/:id"
            exact
            // render={() => {
            //   return props.isSignedIn !== false ? (
            //     <ContactUser />
            //   ) : (
            //     <Redirect to="/login" />
            //   );
            // }}
            component={ContactUser}
          />
          <Route
            path="/trades"
            exact
            render={() => {
              return props.isSignedIn !== false ? (
                <Trades />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route path="/bookInfo/:id" exact component={BookInfo} />
          <Route path="/bookInfo1/:id" exact component={BookInfo1} />
          {/* <Route path="/mySent" exact component={MySent} /> */}
          {/* <Route path="/myReceived" exact component={MyReceived} /> */}
          <Route
            path="/request"
            exact
            render={() => {
              return props.isSignedIn !== false ? (
                <Request />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route
            path="/myCollection"
            exact
            render={() => {
              return props.isSignedIn !== false ? (
                <MyCollection />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route
            path="/wishlist"
            exact
            render={() => {
              return props.isSignedIn !== false ? (
                <Wishlist />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
        </div>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.login.isSignedIn,
  };
};
export default connect(mapStateToProps, { verifyLogin })(App);
