import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Cassette({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/build/models/cassette.gltf')
  return (
    <group ref={group} {...props} dispose={null} position={[1, 1, -3]}>
      <group scale={[0.5, 0.05, -0.5]}>
        <mesh geometry={nodes.Cube_1.geometry} material={materials.exterieur} />
        <mesh geometry={nodes.Cube_2.geometry} material={materials['default']} />
      </group>
    </group>
  )
}

useGLTF.preload('/build/models/cassette.gltf')
