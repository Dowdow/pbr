import React from 'react';
import { Interactive } from '@react-three/xr';

export default function Button({ selected, playing, handleButton }) {
  let color = null;
  if (selected) {
    if (playing) {
      color = '#0074D9';
    } else {
      color = '#2ECC40';
    }
  } else {
    color = '#FF4136';
  }

  return (
    <group castShadow position={[0, 0, -1.5]}>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.1, 1.5, 0.1]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <Interactive onSelect={handleButton}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </Interactive>
    </group>
  );
}
