import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Room({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/build/models/room.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.floor.geometry} material={materials.Floor} scale={[10, 0, 10]} />
      <mesh geometry={nodes.sofa.geometry} material={materials.Canape} position={[-6.69, 0.67, 0]} scale={[1.8, -0.28, 3.98]} />
      <mesh geometry={nodes.carpet.geometry} material={materials.Tapis} position={[0.63, 0, 0.02]} scale={[-3.25, 0.01, 4.26]} />
      <mesh geometry={nodes.shelf.geometry} material={nodes.shelf.material} position={[7.65, 2.37, -2.81]} scale={[-1.42, 2.39, 2.35]} />
      <group position={[7.66, 1.69, 2.63]} scale={[1.19, -0.6, 1.19]}>
        <mesh geometry={nodes.jukebox_1.geometry} material={materials.extmembrane} />
        <mesh geometry={nodes.jukebox_2.geometry} material={nodes.jukebox_2.material} />
        <mesh geometry={nodes.jukebox_3.geometry} material={materials.Membrane} />
        <mesh geometry={nodes.jukebox_4.geometry} material={materials.Lecteur} />
        <mesh geometry={nodes.jukebox_5.geometry} material={materials.Extenceinte} />
      </group>
    </group>
  )
}

useGLTF.preload('/build/models/room.gltf')
