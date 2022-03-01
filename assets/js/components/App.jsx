import React from 'react';
import Header from './Header';
import Songs from './Songs';
import Videos from './Videos';
import Live from './Live';
import Player from './Player';
import Footer from './Footer';
import Shop from './Shop';
import { useIsConnected } from '../hooks/user';
import { useHasVideos } from '../hooks/video';

const App = () => {
    const isConnected = useIsConnected();
    const hasVideos = useHasVideos();

    return (
        <div className="app">
            <Header />
            <Songs />
            <Shop />
            {isConnected ? <Live /> : ''}
            {hasVideos ? <Videos /> : ''}
            <Player />
            <Footer />
        </div>
    );
}

export default App;