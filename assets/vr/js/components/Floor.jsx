import React from 'react';

export default function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[10, 10, 1, 1]} />
      <meshStandardMaterial color="#90D598" />
    </mesh>
  );
}
