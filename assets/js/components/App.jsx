import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from "./Home";
import Songs from "./Songs";
import Live from "./Live";

const App = () =>
    <div className="app">
        <Header/>
        <Switch location={location}>
            <Route exact path='/' component={Home} key="home"/>
            <Route exact path='/songs' component={Songs} key="songs"/>
            <Route exact path='/live' component={Live} key="live"/>
        </Switch>
        <Footer/>
    </div>
;

export default App;