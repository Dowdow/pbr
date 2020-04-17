import React from 'react';
import { useSelector } from 'react-redux';
import Soundcloud from './Soundcloud';

const Songs = () => {
    const songs = useSelector(state => state.songs);
    const mixes = useSelector(state => state.mixes);
    const eps = useSelector(state => state.eps);

    return (
        <div className="container song">
            <section>
                <h2>Songs</h2>
                <div>
                    {songs.map((song, index) =>
                        <Soundcloud key={index}
                            width="95%"
                            height={song.type === 'tracks' ? '166' : '250'}
                            song={song} />
                    )}
                </div>
            </section>
            <section>
                <h2 className="other">EPs</h2>
                <div>
                    {eps.map((ep, index) =>
                        <Soundcloud key={index}
                            width="95%"
                            height={ep.type === 'tracks' ? '166' : '250'}
                            song={ep} />
                    )}
                </div>
            </section>
            <section>
                <h2 className="other">Mixes</h2>
                <div>
                    {mixes.map((mix, index) =>
                        <Soundcloud key={index}
                            width="95%"
                            height={mix.type === 'tracks' ? '166' : '250'}
                            song={mix} />
                    )}
                </div>
            </section>
        </div>
    );
};

export default Songs;