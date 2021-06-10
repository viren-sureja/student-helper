import React from 'react';
import './App.css';
import Quora from './components/Quora';
import Book from './components/Book';
import SpiCpi from './components/SpiCpi';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/quora">
                    <Quora />
                </Route>
                <Route exact path="/book">
                    <Book />
                </Route>
                <Route exact path="/spicpi">
                    <SpiCpi />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
