import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Book from "./components/Book/Book";
import Home from "./components/Home";
import QuoraMain from "./components/Quora/QuoraMain";
import SpiCpi from "./components/SpiCpi";
import SavedPost from "./components/Quora/savedPost";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/quoramain">
          <QuoraMain />
        </Route>
        <Route exact path="/quoramain/savedPost">
          <SavedPost />
        </Route>
        <Route exact path="/spicpi">
          <SpiCpi />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
