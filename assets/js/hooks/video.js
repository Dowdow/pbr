import { useSelector } from 'react-redux';

export function useHasVideos() {
  const videos = useSelector(state => state.videos);

  return videos.length > 0;
}