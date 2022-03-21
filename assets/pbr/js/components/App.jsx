import React from 'react';
import Header from './Header';
import Songs from './Songs';
import Player from './Player';
import Footer from './Footer';
import Shop from './Shop';

const App = () =>
    <div className="app">
        <Header />
        <Songs />
        <Shop />
        <Player />
        <Footer />
    </div>
    ;

export default App;