export const GAMEPAD_SELECT = 'GAMEPAD_SELECT';
export const GAMEPAD_ADD = 'GAMEPAD_ADD';
export const GAMEPAD_REMOVE = 'GAMEPAD_REMOVE';

export function selectGamepad(index) {
  return (dispatch) => dispatch({ type: GAMEPAD_SELECT, index });
}

export function addGamepad(gamepad) {
  return (dispatch) => dispatch({ type: GAMEPAD_ADD, gamepad });
}

export function removeGamepad(gamepad) {
  return (dispatch) => dispatch({ type: GAMEPAD_REMOVE, gamepad });
}
