import React from 'react';
import './App.css';
import Book from './components/Book/Book';
import SpiCpi from './components/SpiCpi';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import QuoraMain from './components/Quora/QuoraMain';

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
