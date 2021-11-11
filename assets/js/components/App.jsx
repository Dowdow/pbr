import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Songs from './Songs';
import Videos from './Videos';
import Live from './Live';
import Player from './Player';

const App = () =>
    <div className="app">
        <Header />
        <Routes location={location}>
            <Route path='/' element={<Home />} key="home" />
            <Route path='/songs' element={<Songs />} key="songs" />
            <Route path='/videos' element={<Videos />} key="videos" />
            <Route path='/live' element={<Live />} key="live" />
        </Routes>
        <Player />
        <Footer />
    </div>
    ;

export default App;