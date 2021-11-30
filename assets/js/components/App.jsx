import React from 'react';
import { useSelector } from 'react-redux';
import Home from './Home';
import Songs from './Songs';
import Videos from './Videos';
import Live from './Live';
import Player from './Player';
import Footer from './Footer';
import Shop from './Shop';

const App = () => {
    const videos = useSelector(state => state.videos);
    const user = useSelector(state => state.user);

    return (
        <div className="app">
            <Home />
            <Songs />
            <Shop />
            {user ? <Live /> : ''}
            {videos.length > 0 ? <Videos /> : ''}
            <Player />
            <Footer />
        </div>
    );
}

export default App;