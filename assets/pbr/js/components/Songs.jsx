import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerCurrentSong } from '../actions/player';
import { useSongHeight } from '../hooks/window';

export default function Songs() {
  const dispatch = useDispatch();
  const songHeight = useSongHeight();

  const songs = useSelector((state) => state.songs);

  const handleSelectSong = (song) => {
    dispatch(setPlayerCurrentSong(song));
  };

  return (
    <div id="songs" className="song">
      {songs.map((song) => (
        <div
          key={`song-${song.id}`}
          className="song-item"
          onClick={() => handleSelectSong(song)}
          style={{ backgroundImage: `url(${song.image})`, height: `${songHeight}px` }}
          role="presentation"
        >
          <div className="song-item-hover">
            <h3>{song.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
