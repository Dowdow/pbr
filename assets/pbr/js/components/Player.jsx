import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { setPlayerCurrentSong, setPlayerPlaying, setPlayerShuffle, setNewTrack } from '../actions/player';
import { addCurrentSongPlays } from '../actions/songs';

export default function Player() {
  const dispatch = useDispatch();

  const songs = useSelector((state) => state.songs);
  const song = useSelector((state) => state.player.currentSong);
  const playing = useSelector((state) => state.player.playing);
  const shuffle = useSelector((state) => state.player.shuffle);
  const transitions = useSelector((state) => state.transitions);

  const [player, setPlayer] = useState(null);
  const [transitionIndex, setTransitionIndex] = useState(0);
  const [progressTime, setProgressTime] = useState(0);
  const [playlistTotal, setPlaylistTotal] = useState(0);

  const playerRef = React.createRef();

  const updatePlaylistData = () => {
    if (player !== null) {
      player.getSounds((sounds) => {
        setPlaylistTotal(sounds.length);
      });
    }
  };

  const handlePlay = () => {
    dispatch(setPlayerPlaying(true));
  };

  const handlePause = () => {
    dispatch(setPlayerPlaying(false));
  };

  const handleProgress = (progress) => {
    setProgressTime(Math.floor(progress.currentPosition / 1000));
  };

  const handleLoaded = () => {
    setProgressTime(0);
    updatePlaylistData();
    if (playing) {
      player.play();
    }
  };

  function handleFinish() {
    this.getCurrentSoundIndex((i) => {
      this.getSounds((sounds) => {
        if (i !== sounds.length - 1) {
          this.next();
        } else {
          dispatch(addCurrentSongPlays());
          dispatch(setNewTrack());
        }
      });
    });
  }

  useEffect(() => {
    if (player === null) {
      const widget = window.SC.Widget(playerRef.current);
      widget.bind(window.SC.Widget.Events.PLAY, handlePlay);
      widget.bind(window.SC.Widget.Events.PAUSE, handlePause);
      widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, handleProgress);
      widget.bind(window.SC.Widget.Events.FINISH, handleFinish);
      setPlayer(widget);
    }
  }, []);

  useEffect(() => {
    if (song !== null) {
      player.load(`https://api.soundcloud.com/${song.playlist ? 'playlists' : 'tracks'}/${song.id}?auto_play=${playing ? 'true' : 'false'}&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true`, { auto_play: playing, callback: handleLoaded });
    }
  }, [song]);

  const handlePlayTransition = () => {
    if (transitions.length > 0) {
      const transition = new Audio(transitions[transitionIndex].file);
      transition.play();
      setTransitionIndex(transitionIndex + 1 === transitions.length ? 0 : transitionIndex + 1);
    }
  };

  useEffect(() => {
    if (player !== null) {
      player.getDuration((duration) => {
        const timeRemaining = Math.floor(duration / 1000) - progressTime;
        if (timeRemaining > 0 && timeRemaining < 6) {
          if (timeRemaining === 5) {
            handlePlayTransition();
          }
        }
      });
    }
  }, [progressTime]);

  const handleNext = () => {
    player.getCurrentSoundIndex((i) => {
      if (i !== playlistTotal - 1) {
        player.next();
      } else {
        dispatch(addCurrentSongPlays());
        dispatch(setNewTrack());
      }
    });
  };

  const handleShuffle = () => {
    dispatch(setPlayerShuffle(!shuffle));
  };

  const handleClose = () => {
    player.pause();
    dispatch(setPlayerPlaying(false));
    dispatch(setPlayerCurrentSong(null));
  };

  if (songs.length === 0) {
    return null;
  }

  return (
    <div className={`fixed bg-skin-fill bottom-0 left-0 right-0 w-full md:w-3/5 lg:w-1/2 xl:w-1/3 mx-auto z-10 ${song === null ? 'hidden' : ''}`}>
      <div className="flex flex-row justify-between p-1">
        <button type="button" onClick={handleNext}>
          <FontAwesomeIcon icon={faStepForward} className="h-5 w-5" />
        </button>
        <label className="flex items-center">
          <input type="checkbox" onChange={handleShuffle} checked={shuffle} className="mr-1" />
          <span>Shuffle</span>
        </label>
        <button type="button" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
        </button>
      </div>
      <iframe
        ref={playerRef}
        width="100%"
        height="300px"
        allow="autoplay"
        scrolling="no"
        frameBorder="no"
        title="player"
        src={`https://w.soundcloud.com/player/?url=https://api.soundcloud.com/${songs[0].playlist ? 'playlists' : 'tracks'}/${songs[0].id}?hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
      />
    </div>
  );
}
