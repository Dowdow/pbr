export const GAMEPAD_ADD = 'GAMEPAD_ADD';
export const GAMEPAD_REMOVE = 'GAMEPAD_REMOVE';
export const GAMEPAD_TOGGLE_ACTIVATED = 'GAMEPAD_TOGGLE_ACTIVATED';

export function addGamepad(gamepad) {
  return (dispatch) => dispatch({ type: GAMEPAD_ADD, gamepad });
}

export function removeGamepad(index) {
  return (dispatch) => dispatch({ type: GAMEPAD_REMOVE, index });
}

export function toggleGamepadActivated(index) {
  return (dispatch) => dispatch({ type: GAMEPAD_TOGGLE_ACTIVATED, index });
}
