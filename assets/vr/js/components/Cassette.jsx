import React from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { Interactive } from '@react-three/xr';

export default function Cassette({ song, index, total, selected, handleSelected }) {
  const map = useLoader(TextureLoader, song.image);

  const totalSize = (total * 0.5) + ((total) * 0.1);
  const x = (index * 0.5) + ((index) * 0.1) - totalSize / 2 + (0.5 / 2) + (0.1 / 2);
  const z = selected ? -2.3 : -2.5;

  return (
    <Interactive onSelect={() => handleSelected(song)}>
      <mesh position={[x, 2, z]} scale={[0.5, 0.5, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial map={map} />
      </mesh>
    </Interactive>
  );
}
