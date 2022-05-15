import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerCurrentSong } from '../actions/player';
import { useSongHeight } from '../hooks/window';

export default function Songs() {
  const songs = useSelector((state) => state.songs);

  return (
    <div id="songs" className="flex flex-row flex-wrap bg-skin-songs">
      {songs.map((song) => <SongItem key={song.id} song={song} />)}
    </div>
  );
}

function SongItem({ song }) {
  const dispatch = useDispatch();
  const songHeight = useSongHeight();

  const [hover, setHover] = useState(false);

  const handleSelectSong = (s) => {
    dispatch(setPlayerCurrentSong(s));
  };

  return (
    <div
      className="relative block w-1/2 md:w-1/3 lg:w-1/4 bg-cover cursor-pointer"
      onClick={() => handleSelectSong(song)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ backgroundImage: `url(${song.image})`, height: `${songHeight}px` }}
      role="presentation"
    >
      <div className={`absolute flex top-0 bottom-0 left-0 right-0 h-full w-full transition-opacity bg-skin-song-hover ${hover ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="mx-auto px-5 self-center text-2xl text-center font-bold text-skin-fill break-words">{song.name}</h3>
      </div>
    </div>
  );
}

SongItem.propTypes = {
  song: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
