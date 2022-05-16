import { MIDI_OUTPUT_ADD, MIDI_OUTPUT_REMOVE, MIDI_OUTPUT_TOGGLE_ACTIVATED } from '../actions/midiOutputs';

export default function midiOutputs(state = [], action = {}) {
  switch (action.type) {
    case MIDI_OUTPUT_ADD:
      if (state.filter((mo) => mo.id === action.midiOutput.id).length === 0) {
        return [...state, action.midiOutput];
      }
      return state;
    case MIDI_OUTPUT_REMOVE:
      return [...state.filter((mo) => mo.id !== action.id)];
    case MIDI_OUTPUT_TOGGLE_ACTIVATED: {
      const indexMO = state.findIndex((mo) => mo.id === action.id);
      if (indexMO !== -1) {
        const MIDIOutput = { ...state[indexMO] };
        state.splice(indexMO, 1);
        MIDIOutput.activated = !MIDIOutput.activated;
        return [...state, MIDIOutput];
      }
      return state;
    }
    default:
      return state;
  }
}
