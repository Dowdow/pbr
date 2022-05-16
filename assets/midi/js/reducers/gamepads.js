import { GAMEPAD_ADD, GAMEPAD_REMOVE, GAMEPAD_TOGGLE_ACTIVATED } from '../actions/gamepads';

export default function gamepads(state = [], action = {}) {
  switch (action.type) {
    case GAMEPAD_ADD:
      return [...state, action.gamepad];
    case GAMEPAD_REMOVE:
      return [...state.filter((g) => g.index !== action.index)];
    case GAMEPAD_TOGGLE_ACTIVATED: {
      const indexGamepad = state.findIndex((g) => g.index === action.index);
      if (indexGamepad !== -1) {
        const gamepad = { ...state[indexGamepad] };
        state.splice(indexGamepad, 1);
        gamepad.activated = !gamepad.activated;
        return [...state, gamepad];
      }
      return state;
    }

    default:
      return state;
  }
}
