import React, { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { VRCanvas, DefaultXRControllers, RayGrab } from '@react-three/xr';
import Room from './Room';
import { useResize } from '../hooks/resize';
import Cassette from './Cassette';

const App = () => {
  const height = useResize();

  return (
    <VRCanvas style={{ height }}>
      <ambientLight intensity={0.3} />
      <spotLight intensity={0.5} position={[0, 0, 10]} />
      <Suspense fallback={null}>
        <OrbitControls />
        <Room />
      </Suspense>
      <Suspense fallback={null}>
        <RayGrab>
          <Cassette />
        </RayGrab>
      </Suspense>
      <DefaultXRControllers />
    </VRCanvas>
  )
}

export default App;