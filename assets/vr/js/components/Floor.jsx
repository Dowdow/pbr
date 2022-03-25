import React from 'react';
import { DoubleSide, Color } from 'three';

const floorVertexShader = `
varying vec3 worldPosition;

uniform float uDistance;

void main() {
  vec3 pos = position.xzy * uDistance;
  pos.xz += cameraPosition.xz;
  worldPosition = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const floorFragmentShader = `
varying vec3 worldPosition;

uniform float uSize1;
uniform float uSize2;
uniform vec3 uColor;
uniform float uDistance;
 
float getGrid(float size) { 
  vec2 r = worldPosition.xz / size;
  vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
  float line = min(grid.x, grid.y);
  return 1.0 - min(line, 1.0);
}
 
void main() {   
  float d = 1.0 - min(distance(cameraPosition.xz, worldPosition.xz) / uDistance, 1.0);
  float g1 = getGrid(uSize1);
  float g2 = getGrid(uSize2);
  gl_FragColor = vec4(uColor.rgb, mix(g2, g1, g1) * pow(d, 3.0));
  gl_FragColor.a = mix(0.5 * gl_FragColor.a, gl_FragColor.a, g2);   
  if ( gl_FragColor.a <= 0.0 ) discard;
}
`;

export default function Floor() {
  return (
    <mesh>
      <planeBufferGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        transparent
        side={DoubleSide}
        uniforms={{ uSize1: { value: 1 }, uSize2: { value: 10 }, uColor: { value: new Color(0xaaaaaa) }, uDistance: { value: 200 } }}
        vertexShader={floorVertexShader}
        fragmentShader={floorFragmentShader}
        extensions={{ derivatives: true }}
      />
    </mesh>
  );
}
