export const MIDI_OUTPUT_ADD = 'MIDI_OUTPUT_ADD';
export const MIDI_OUTPUT_REMOVE = 'MIDI_OUTPUT_REMOVE';
export const MIDI_OUTPUT_TOGGLE_ACTIVATED = 'MIDI_OUTPUT_TOGGLE_ACTIVATED';

export function addMidiOutput(midiOutput) {
  return (dispatch) => dispatch({ type: MIDI_OUTPUT_ADD, midiOutput });
}

export function removeMidiOutput(id) {
  return (dispatch) => dispatch({ type: MIDI_OUTPUT_REMOVE, id });
}

export function toggleMidiOutputActivated(id) {
  return (dispatch) => dispatch({ type: MIDI_OUTPUT_TOGGLE_ACTIVATED, id });
}
