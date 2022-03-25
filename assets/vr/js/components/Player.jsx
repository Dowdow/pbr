import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaying, setSelected } from '../actions/player';

export default function Player() {
  const dispatch = useDispatch();

  const songs = useSelector((state) => state.songs);
  const song = useSelector((state) => state.player.selected);
  const playing = useSelector((state) => state.player.playing);

  const [player, setPlayer] = useState(null);

  const playerRef = React.createRef();

  function handleFinish() {
    this.getCurrentSoundIndex((i) => {
      this.getSounds((sounds) => {
        if (i !== sounds.length - 1) {
          this.next();
        } else {
          dispatch(setSelected(null));
          dispatch(setPlaying(false));
        }
      });
    });
  }

  useEffect(() => {
    if (player === null) {
      const widget = window.SC.Widget(playerRef.current);
      widget.bind(window.SC.Widget.Events.FINISH, handleFinish);
      setPlayer(widget);
    }
  }, []);

  const handleLoaded = () => {
    if (playing) {
      player.play();
    }
  };

  useEffect(() => {
    if (song !== null) {
      player.load(`https://api.soundcloud.com/${song.playlist ? 'playlists' : 'tracks'}/${song.id}?auto_play=${playing ? 'true' : 'false'}&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`, { auto_play: playing, callback: handleLoaded });
    }
  }, [song]);

  useEffect(() => {
    if (player) {
      if (playing) {
        player.play();
      } else {
        player.pause();
      }
    }
  }, [playing]);

  if (songs.length === 0) {
    return null;
  }

  return (
    <iframe
      ref={playerRef}
      width="100%"
      height="170px"
      allow="autoplay"
      scrolling="no"
      frameBorder="no"
      title="player"
      style={{ display: 'none' }}
      src={`https://w.soundcloud.com/player/?url=https://api.soundcloud.com/${songs[0].playlist ? 'playlists' : 'tracks'}/${songs[0].id}?hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`}
    />
  );
}
