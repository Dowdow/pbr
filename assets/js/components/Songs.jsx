import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerCurrentSong } from '../actions/player';

const Songs = () => {
    const dispatch = useDispatch();

    const songs = useSelector(state => state.songs);

    const handleSelectSong = (song) => {
        dispatch(setPlayerCurrentSong(song));
    }

    return (
        <div className="container song">
            {songs.map((song, index) =>
                <div key={index} className="song-item" onClick={() => handleSelectSong(song)}>
                    <img src={song.image} alt={song.name} />
                    <h3>{song.name}</h3>
                </div>
            )}
        </div>
    );
};

export default Songs;