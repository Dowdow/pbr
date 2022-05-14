import { GAMEPAD_ADD, GAMEPAD_REMOVE, GAMEPAD_SELECT } from '../actions/gamepads';

const init = { selected: null, gamepads: [] };

export default function gamepads(state = init, action = {}) {
  switch (action.type) {
    case GAMEPAD_SELECT:
      return { ...state, selected: action.index };
    case GAMEPAD_ADD:
      return { ...state, gamepads: [...state.gamepads, action.gamepad] };
    case GAMEPAD_REMOVE:
      return {
        ...state,
        selected: state.selected === action.gamepad.index ? null : state.selected,
        gamepads: state.gamepads.filter((g) => g.index !== action.gamepad.index),
      };
    default:
      return state;
  }
}
