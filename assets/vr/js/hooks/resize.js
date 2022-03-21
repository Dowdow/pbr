import { useState } from 'react';

export function useResize() {
  const [height, setHeight] = useState(window.innerHeight);

  window.onresize = () => {
    setHeight(window.innerHeight);
  }

  return height;
}