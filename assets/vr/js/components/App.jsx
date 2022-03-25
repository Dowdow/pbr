import React, { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VRCanvas, DefaultXRControllers } from '@react-three/xr';
import { OrbitControls, Sky } from '@react-three/drei';
import Cassette from './Cassette';
import Floor from './Floor';
import Button from './Button';
import { useResize } from '../hooks/resize';
import { setPlaying, setSelected } from '../actions/player';
import Player from './Player';

export default function App() {
  const dispatch = useDispatch();
  const height = useResize();

  const playing = useSelector((state) => state.player.playing);
  const selectedSong = useSelector((state) => state.player.selected);
  const songs = useSelector((state) => state.songs);

  const handleSelected = (song) => {
    if (selectedSong && selectedSong.id === song.id) {
      dispatch(setSelected(null));
      dispatch(setPlaying(false));
    } else {
      dispatch(setSelected(song));
    }
  };

  const handleButton = () => {
    dispatch(setPlaying(!playing));
  };

  return (
    <div>
      <VRCanvas style={{ height }}>
        <Sky distance={2000} rayleigh={0.1} sunPosition={[0, 1, 0]} turbidity={1} />
        <ambientLight />
        <Floor />
        <Button selected={selectedSong !== null} playing={playing} handleButton={handleButton} />
        {songs.map((song, index) => (
          <Suspense key={song.id} fallback={null}>
            <Cassette song={song} index={index} total={songs.length} selected={selectedSong && song.id === selectedSong.id} handleSelected={handleSelected} />
          </Suspense>
        ))}
        <OrbitControls />
        <DefaultXRControllers />
      </VRCanvas>
      <Player />
    </div>
  );
}
