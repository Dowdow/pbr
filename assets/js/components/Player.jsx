import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faTimes, faStepForward, faVolumeLow } from '@fortawesome/free-solid-svg-icons';
import { setPlayerCurrentSong, setPlayerPlaying, setPlayerShuffle, setNewTrack, setPlayerVolume } from '../actions/player';
import { addCurrentSongPlays } from '../actions/songs';

const Player = () => {
    const dispatch = useDispatch();

    const songs = useSelector(state => state.songs);
    const song = useSelector(state => state.player.currentSong);
    const playing = useSelector(state => state.player.playing);
    const shuffle = useSelector(state => state.player.shuffle);
    const volume = useSelector(state => state.player.volume);
    const transitions = useSelector(state => state.transitions);

    const [player, setPlayer] = useState(null);
    const [transitionIndex, setTransitionIndex] = useState(0);
    const [progressTime, setProgressTime] = useState(0);
    const [progressPercent, setProgressPercent] = useState(0);
    const [playlistTotal, setPlaylistTotal] = useState(0);
    const [playlistCurrentName, setPlaylistCurrentName] = useState('');

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
            player.load(`https://api.soundcloud.com/${song.playlist ? 'playlists' : 'tracks'}/${song.id}?auto_play=${playing ? 'true' : 'false'}&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`, { auto_play: playing, callback: handleLoaded });
        }
    }, [song]);

    useEffect(() => {
        if (player !== null) {
            player.getDuration(duration => {
                const timeRemaining = Math.floor(duration / 1000) - progressTime;
                if (timeRemaining > 0 && timeRemaining < 6) {
                    if (timeRemaining === 5) {
                        handlePlayTransition();
                    }
                }
            });
        }
    }, [progressTime]);

    useEffect(() => {
        if (player !== null) {
            player.setVolume(volume);
        }
    }, [volume]);

    const handleLoaded = () => {
        setProgressTime(0);
        setProgressPercent(0);
        updatePlaylistData();
        if (playing) {
            player.play();
            player.setVolume(volume);
        }
    }

    const handlePlayPause = () => {
        player.toggle();
        dispatch(setPlayerPlaying(!playing));
    }

    const handleNext = () => {
        player.getCurrentSoundIndex(i => {
            if (i !== playlistTotal - 1) {
                player.next();
                updatePlaylistData();
            } else {
                dispatch(addCurrentSongPlays());
                dispatch(setNewTrack());
            }
        });
    }

    const handlePlayTransition = () => {
        if (transitions.length > 0) {
            const transition = new Audio(transitions[transitionIndex]['file']);
            transition.setVolume(0.7);
            transition.play();
            setTransitionIndex(transitionIndex + 1 === transitions.length ? 0 : transitionIndex + 1);
        }
    }

    const handleVolume = (e) => {
        dispatch(setPlayerVolume(e.target.value));
    }

    const handleShuffle = () => {
        dispatch(setPlayerShuffle(!shuffle));
    }

    const handleProgress = (progress) => {
        setProgressTime(Math.floor(progress.currentPosition / 1000));
        setProgressPercent(progress.relativePosition * 100);
    }

    const handleProgressClick = (e) => {
        const rectangle = e.target.getBoundingClientRect();
        const start = rectangle.left;
        const end = rectangle.right;
        const progress = e.pageX;

        const percent = Math.min(Math.max((progress - start) / (end - start), 0), 1);

        player.getDuration(duration => {
            player.seekTo(Math.floor(duration * percent));
        });
    }

    function handleFinish() {
        this.getCurrentSoundIndex(i => {
            if (i !== playlistTotal - 1) {
                this.next();
                this.getSounds(sounds => {
                    setPlaylistCurrentName(sounds[i + 1].title);
                });
            } else {
                dispatch(addCurrentSongPlays());
                dispatch(setNewTrack());
            }
        });
    }

    const handleClose = () => {
        player.pause();
        dispatch(setPlayerPlaying(false));
        dispatch(setPlayerCurrentSong(null));
    }

    const updatePlaylistData = () => {
        if (player !== null) {
            player.getSounds(sounds => {
                setPlaylistTotal(sounds.length);
                player.getCurrentSoundIndex(i => {
                    setPlaylistCurrentName(sounds[i].title);
                });
            });
        }
    }

    if (songs.length === 0) {
        return null;
    }

    return (
        <div className={'player' + (song === null ? ' hide' : '')}>
            <div className="player-info">
                <img src={song !== null ? song.image : ''} alt={song !== null ? song.name : ''} />
                <div className="player-info-side">
                    <div className="player-info-title">
                        <h3>{song !== null ? song.name : ''}{song !== null && song.playlist ? ` / ${playlistCurrentName}` : ''}</h3>
                        <button type="button" onClick={handleClose}><FontAwesomeIcon icon={faTimes} /></button>
                    </div>
                    <div className="player-info-controls">
                        <button type="button" onClick={handlePlayPause}><FontAwesomeIcon icon={playing ? faPause : faPlay} /></button>
                        <button type="button" onClick={handleNext}><FontAwesomeIcon icon={faStepForward} /></button>
                        <progress value={progressPercent} max="100" onClick={handleProgressClick}></progress>
                    </div>
                    <div className="player-info-other">
                        <label><input type="checkbox" onChange={handleShuffle} checked={shuffle} />Shuffle</label>
                        <label><FontAwesomeIcon icon={faVolumeLow} /><input type="range" min="0" max="100" value={volume} onChange={handleVolume} /></label>
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
                src={`https://w.soundcloud.com/player/?url=https://api.soundcloud.com/${songs[0].playlist ? 'playlists' : 'tracks'}/${songs[0].id}?hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`} />
        </div>
    );
}

export default Player;