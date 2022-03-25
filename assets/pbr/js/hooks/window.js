import { useState } from 'react';

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  window.addEventListener('resize', () => setWidth(window.innerWidth));

  return width;
}

export function useSongHeight() {
  const windowWidth = useWindowWidth();

  if (windowWidth <= 768) {
    return windowWidth / 2;
  }

  if (windowWidth <= 1024) {
    return windowWidth / 3;
  }

  return windowWidth / 4;
}
