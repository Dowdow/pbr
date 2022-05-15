import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faTimes, faStepForward, faVolumeLow } from '@fortawesome/free-solid-svg-icons';
import { setPlayerCurrentSong, setPlayerPlaying, setPlayerShuffle, setNewTrack, setPlayerVolume } from '../actions/player';
import { addCurrentSongPlays } from '../actions/songs';

export default function Player() {
  const dispatch = useDispatch();

  const songs = useSelector((state) => state.songs);
  const song = useSelector((state) => state.player.currentSong);
  const playing = useSelector((state) => state.player.playing);
  const shuffle = useSelector((state) => state.player.shuffle);
  const volume = useSelector((state) => state.player.volume);
  const transitions = useSelector((state) => state.transitions);

  const [player, setPlayer] = useState(null);
  const [transitionIndex, setTransitionIndex] = useState(0);
  const [progressTime, setProgressTime] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [playlistTotal, setPlaylistTotal] = useState(0);
  const [playlistCurrentName, setPlaylistCurrentName] = useState('');

  const playerRef = React.createRef();

  const handleProgress = (progress) => {
    setProgressTime(Math.floor(progress.currentPosition / 1000));
    setProgressPercent(progress.relativePosition * 100);
  };

  function handleFinish() {
    this.getCurrentSoundIndex((i) => {
      this.getSounds((sounds) => {
        if (i !== sounds.length - 1) {
          this.next();
          setPlaylistCurrentName(sounds[i + 1].title);
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

  const handlePlayTransition = () => {
    if (transitions.length > 0) {
      const transition = new Audio(transitions[transitionIndex].file);
      transition.volume = volume / 100;
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

  useEffect(() => {
    if (player !== null) {
      player.setVolume(volume);
    }
  }, [volume]);

  const updatePlaylistData = () => {
    if (player !== null) {
      player.getSounds((sounds) => {
        setPlaylistTotal(sounds.length);
        player.getCurrentSoundIndex((i) => {
          setPlaylistCurrentName(sounds[i].title);
        });
      });
    }
  };

  const handleLoaded = () => {
    setProgressTime(0);
    setProgressPercent(0);
    updatePlaylistData();
    if (playing) {
      player.play();
      player.setVolume(volume);
    }
  };

  const handlePlayPause = () => {
    player.toggle();
    player.setVolume(volume);
    dispatch(setPlayerPlaying(!playing));
  };

  const handleNext = () => {
    player.getCurrentSoundIndex((i) => {
      if (i !== playlistTotal - 1) {
        player.next();
        updatePlaylistData();
      } else {
        dispatch(addCurrentSongPlays());
        dispatch(setNewTrack());
      }
    });
  };

  const handleVolume = (e) => {
    dispatch(setPlayerVolume(e.target.value));
  };

  const handleShuffle = () => {
    dispatch(setPlayerShuffle(!shuffle));
  };

  const handleProgressClick = (e) => {
    const rectangle = e.target.getBoundingClientRect();
    const start = rectangle.left;
    const end = rectangle.right;
    const progress = e.pageX;

    const percent = Math.min(Math.max((progress - start) / (end - start), 0), 1);

    player.getDuration((duration) => {
      player.seekTo(Math.floor(duration * percent));
    });
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
      <div className="flex flex-row">
        <img src={song !== null ? song.image : ''} alt={song !== null ? song.name : ''} className="w-24 h-24 object-cover" />
        <div className="flex flex-col justify-evenly grow">
          <div className="flex flex-row justify-between items-center mx-2">
            <h3 className="font-bold">
              {song !== null ? song.name : ''}
              {song !== null && song.playlist ? ` / ${playlistCurrentName}` : ''}
            </h3>
            <button type="button" onClick={handleClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="flex flex-row justify-between items-center mx-2">
            <button type="button" onClick={handlePlayPause} className="mr-2">
              <FontAwesomeIcon icon={playing ? faPause : faPlay} className="h-5 w-5" />
            </button>
            <button type="button" onClick={handleNext} className="mr-2">
              <FontAwesomeIcon icon={faStepForward} className="h-5 w-5" />
            </button>
            <progress value={progressPercent} max="100" onClick={handleProgressClick} className="grow h-5 rounded" />
          </div>
          <div className="flex flex-row justify-between items-center mx-2">
            <label className="flex items-center">
              <input type="checkbox" onChange={handleShuffle} checked={shuffle} className="mr-1" />
              Shuffle
            </label>
            <label className="flex items-center">
              <FontAwesomeIcon icon={faVolumeLow} className="mr-2" />
              <input type="range" min="0" max="100" value={volume} onChange={handleVolume} />
            </label>
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
        title="player"
        className="hidden"
        src={`https://w.soundcloud.com/player/?url=https://api.soundcloud.com/${songs[0].playlist ? 'playlists' : 'tracks'}/${songs[0].id}?hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`}
      />
    </div>
  );
}
