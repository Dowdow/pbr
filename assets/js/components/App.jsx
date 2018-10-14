import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from "./Home";
import Songs from "./Songs";
import Live from "./Live";
import Shop from "./Shop";

const App = () => {
    return (
        <div className="app">
            <Header/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/songs' component={Songs}/>
                <Route exact path='/live' component={Live}/>
                <Route exact path='/shop' component={Shop}/>
            </Switch>
            <Footer/>
        </div>
    );
};

export default App;