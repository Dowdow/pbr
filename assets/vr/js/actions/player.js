export const PLAYER_SET_SELECTED = 'PLAYER_SET_SELECTED';
export const PLAYER_SET_PLAYING = 'PLAYER_SET_PLAYING';

export function setSelected(selected) {
  return (dispatch) => dispatch({ type: PLAYER_SET_SELECTED, selected });
}

export function setPlaying(playing) {
  return (dispatch) => dispatch({ type: PLAYER_SET_PLAYING, playing });
}
