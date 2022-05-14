import { MIDI_OUTPUT_ADD, MIDI_OUTPUT_REMOVE, MIDI_OUTPUT_SELECT } from '../actions/midiOutputs';

const init = { selected: null, midiOutputs: [] };

export default function midiOutputs(state = init, action = {}) {
  switch (action.type) {
    case MIDI_OUTPUT_SELECT:
      return { ...state, selected: action.id };
    case MIDI_OUTPUT_ADD:
      if (state.midiOutputs.filter((mo) => mo.id === action.midiOutput.id).length === 0) {
        return { ...state, midiOutputs: [...state.midiOutputs, action.midiOutput] };
      }
      return state;
    case MIDI_OUTPUT_REMOVE:
      return {
        ...state,
        selected: state.selected === action.id ? null : state.selected,
        midiOutputs: state.midiOutputs.filter((mo) => mo.id !== action.id),
      };
    default:
      return state;
  }
}
