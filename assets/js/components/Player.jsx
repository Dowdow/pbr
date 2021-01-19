import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerCurrentSong, setPlayerRadioMode } from '../actions/player';

let widget = null;

const Player = () => {
    const dispatch = useDispatch();

    const song = useSelector(state => state.player.currentSong);
    const radioMode = useSelector(state => state.player.radioMode);

    const playerRef = React.createRef();

    useEffect(() => {
        if (song !== null) {
            widget = window.SC.Widget(playerRef.current);
        }
    });

    const handlePlayPause = () => {
        widget.toggle();
    }

    const handleRadioMode = () => {
        dispatch(setPlayerRadioMode(!radioMode));
    }

    const handleClose = () => {
        dispatch(setPlayerCurrentSong(null));
    }

    if (song === null) {
        return null;
    }

    return (
        <div className="player">
            <div className="player-info">
                <img src={song.image} alt={song.name} />
                <div className="player-info-side">
                    <h3>{song.name}</h3>
                    <div className="player-info-controls">
                        <button type="button" onClick={handlePlayPause}>Play</button>
                        <button type="button" onClick={handleRadioMode}>Radio Mode</button>
                        <button type="button" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
            <iframe
                ref={playerRef}
                width="100%"
                height="170px"
                allow="autoplay"
                scrolling="no"
                frameBorder="no"
                style={{ display: 'none' }}
                src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${song.id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`} />
        </div>
    );
}

export default Player;