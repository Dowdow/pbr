import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faTimes } from '@fortawesome/free-solid-svg-icons';
import { setPlayerCurrentSong, setPlayerPlaying, setPlayerRadioMode, setNewRandomTrackRadioMode } from '../actions/player';

const transitions = ['/audio/transi1.wav', '/audio/transi2.wav', '/audio/transi3.wav'];

const Player = () => {
    const dispatch = useDispatch();

    const songs = useSelector(state => state.songs);
    const song = useSelector(state => state.player.currentSong);
    const playing = useSelector(state => state.player.playing);
    const radioMode = useSelector(state => state.player.radioMode);

    const [player, setPlayer] = useState(null);
    const [transitionIndex, setTransitionIndex] = useState(0);
    const [progressTime, setProgressTime] = useState('0:00');
    const [progressPercent, setProgressPercent] = useState(0);

    const playerRef = React.createRef();

    useEffect(() => {
        if (player === null) {
            const widget = window.SC.Widget(playerRef.current);
            widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, handleProgress);
            widget.bind(window.SC.Widget.Events.FINISH, handleFinish);
            setPlayer(widget);
        }
    }, []);

    useEffect(() => {
        if (song !== null) {
            player.load(`https://api.soundcloud.com/tracks/${song.id}`, { auto_play: playing });
            player.setVolume(radioMode ? 0 : 100);
        }
    }, [song]);

    useEffect(() => {
        if (player !== null && radioMode) {
            player.getDuration(duration => {
                const timeRemaining = Math.floor(duration / 1000) - progressTime;
                /*if (progressTime === 0 || timeRemaining === 0) {
                    player.setVolume(0);
                } else if (progressTime > 0 && progressTime < 6) {
                    player.setVolume(progressTime * 20);
                } else*/ if (timeRemaining > 0 && timeRemaining < 6) {
                    if (timeRemaining === 5) {
                        handlePlayTransition();
                    }
                    player.setVolume(timeRemaining * 20);
                }
            });
        }
    }, [progressTime])

    const handlePlayPause = () => {
        player.toggle();
        dispatch(setPlayerPlaying(!playing));
    }

    const handlePlayTransition = () => {
        const transition = new Audio(transitions[transitionIndex]);
        transition.play();
        setTransitionIndex(transitionIndex + 1 === transitions.length ? 0 : transitionIndex + 1);
    }

    const handleRadioMode = () => {
        if (radioMode) {
            player.setVolume(100);
        }
        dispatch(setPlayerRadioMode(!radioMode));
    }

    const handleProgress = (progress) => {
        setProgressTime(Math.floor(progress.currentPosition / 1000));
        setProgressPercent(progress.relativePosition * 100);
    }

    const handleFinish = () => {
        dispatch(setNewRandomTrackRadioMode());
    }

    const handleClose = () => {
        dispatch(setPlayerCurrentSong(null));
    }

    if (songs.length === 0) {
        return null;
    }

    return (
        <div className={'player' + (song === null ? ' hide' : '')}>
            <div className="player-info">
                <img src={song !== null ? song.image : ''} alt={song !== null ? song.name : ''} />
                <div className="player-info-side">
                    <h3>{song !== null ? song.name : ''}</h3>
                    <div className="player-info-controls">
                        <button type="button" onClick={handlePlayPause}><FontAwesomeIcon icon={playing ? faPause : faPlay} /></button>
                        <label><input type="checkbox" onChange={handleRadioMode} />Radio Mode</label>
                        <progress value={progressPercent} max="100"></progress>
                        <button type="button" onClick={handleClose}><FontAwesomeIcon icon={faTimes} /></button>
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
                /*style={{ display: 'none' }}*/
                src={`https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/${songs[0].id}`} />
        </div>
    );
}

export default Player;