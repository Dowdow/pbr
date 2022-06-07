import { SET_PLAYER_CURRENT_SONG, SET_PLAYER_PLAYING, SET_PLAYER_SHUFFLE_MODE } from '../actions/player';

export const init = { currentSong: null, playing: false, shuffle: false };

export default function player(state = init, action = {}) {
  switch (action.type) {
    case SET_PLAYER_CURRENT_SONG:
      return { ...state, currentSong: action.song };
    case SET_PLAYER_PLAYING:
      return { ...state, playing: action.playing };
    case SET_PLAYER_SHUFFLE_MODE:
      return { ...state, shuffle: action.on };
    default:
      return state;
  }
}
