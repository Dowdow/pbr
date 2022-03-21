import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerCurrentSong } from '../actions/player';
import { useSongHeight } from '../hooks/window';

const Songs = () => {
    const dispatch = useDispatch();
    const songHeight = useSongHeight();

    const songs = useSelector(state => state.songs);

    const handleSelectSong = (song) => {
        dispatch(setPlayerCurrentSong(song));
    }

    return (
        <div id="songs" className="song">
            {songs.map((song, index) =>
                <div key={index}
                    className="song-item"
                    onClick={() => handleSelectSong(song)}
                    style={{ backgroundImage: `url(${song.image})`, height: `${songHeight}px` }}>
                    <div className="song-item-hover">
                        <h3>{song.name}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Songs;