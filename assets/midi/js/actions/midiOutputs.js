export const MIDI_OUTPUT_SELECT = 'MIDI_OUTPUT_SELECT';
export const MIDI_OUTPUT_ADD = 'MIDI_OUTPUT_ADD';
export const MIDI_OUTPUT_REMOVE = 'MIDI_OUTPUT_REMOVE';

export function selectMidiOutput(id) {
  return (dispatch) => dispatch({ type: MIDI_OUTPUT_SELECT, id });
}

export function addMidiOutput(midiOutput) {
  return (dispatch) => dispatch({ type: MIDI_OUTPUT_ADD, midiOutput });
}

export function removeMidiOutput(id) {
  return (dispatch) => dispatch({ type: MIDI_OUTPUT_REMOVE, id });
}
