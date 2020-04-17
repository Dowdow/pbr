import React from 'react';
import YouTube from 'react-youtube';
import { useSelector } from 'react-redux';
import Soundcloud from './Soundcloud';

const Home = () => {
    const songs = useSelector(state => state.songs);
    const mixes = useSelector(state => state.mixes);
    const eps = useSelector(state => state.eps);
    const videos = useSelector(state => state.videos);

    return (
        <div className="home">
            <section className="home_title">
                <h2>Enter the Pain Boudin Record experience</h2>
                <h2 className="blink">l</h2>
            </section>
            <section className="home_line">
                {songs.length > 0 ?
                    <div>
                        <h2>Last Song</h2>
                        <Soundcloud width="80%"
                            height={songs[0].type === 'tracks' ? '166' : '250'}
                            song={songs[0]} />
                    </div> : ''}
                {mixes.length > 0 ?
                    <div>
                        <h2>Last Mix</h2>
                        <Soundcloud width="80%"
                            height={mixes[0].type === 'tracks' ? '166' : '250'}
                            song={mixes[0]} />
                    </div> : ''}
            </section>
            <section className="home_line second">
                {eps.length > 0 ?
                    <div>
                        <h2>Last EP</h2>
                        <Soundcloud width="80%"
                            height={eps[0].type === 'tracks' ? '166' : '250'}
                            song={eps[0]} />
                    </div> : ''}
                {Object.keys(videos).length > 0 ?
                    <div>
                        <h2>Last Video</h2>
                        <YouTube videoId={videos[1]} className="video" />
                    </div> : ''}
            </section>
        </div>
    );
};

export default Home;