import { PLAYER_SET_PLAYING, PLAYER_SET_SELECTED } from '../actions/player';

const init = { selected: null, playing: false };

export default function player(state = init, action = {}) {
  switch (action.type) {
    case PLAYER_SET_SELECTED:
      return { ...state, selected: action.selected };
    case PLAYER_SET_PLAYING:
      return { ...state, playing: action.playing };
    default:
      return state;
  }
}
