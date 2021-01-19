import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Songs from './Songs';
import Videos from './Videos';
import Live from './Live';
import Player from './Player';

const App = () =>
    <div className="app">
        <Route component={Header} />
        <Switch location={location}>
            <Route exact path='/' component={Home} key="home" />
            <Route exact path='/songs' component={Songs} key="songs" />
            <Route exact path='/videos' component={Videos} key="videos" />
            <Route exact path='/live' component={Live} key="live" />
        </Switch>
        <Player />
        <Footer />
    </div>
    ;

export default App;