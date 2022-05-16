import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLog } from '../actions/logs';
import { addMidiOutput, removeMidiOutput } from '../actions/midiOutputs';
import { MIDI_TYPE_CC, MIDI_TYPE_NOTE_OFF, MIDI_TYPE_NOTE_ON } from '../utils/midi';

let MIDIAccess = null;

function createDataFromMIDIPort(port) {
  return {
    id: port.id,
    manufacturer: port.manufacturer,
    name: port.name,
    version: port.version,
    activated: false,
  };
}

function sendMidiMessage(MIDIOutputIds, byte1, byte2, byte3) {
  MIDIOutputIds.forEach((id) => {
    const output = MIDIAccess.outputs.get(id);
    if (output) {
      output.send([byte1, byte2, byte3]);
    }
  });
}

function sendMidiNoteOnMessage(MIDIOutputIds, channel, value1, value2) {
  sendMidiMessage(MIDIOutputIds, 144 + channel, value1, value2);
}

function sendMidiNoteOffMessage(MIDIOutputIds, channel, value1, value2) {
  sendMidiMessage(MIDIOutputIds, 128 + channel, value1, value2);
}

function sendMidiCCMessage(MIDIOutputIds, channel, value1, value2) {
  sendMidiMessage(MIDIOutputIds, 176 + channel, value1, value2);
}

export default function useMidiOutputs() {
  const dispatch = useDispatch();

  const midiOutputs = useSelector((state) => state.midiOutputs);

  function onMIDIAccessStateChange(event) {
    const { port } = event;
    if (port.type === 'output') {
      if (port.state === 'connected') {
        dispatch(addMidiOutput(createDataFromMIDIPort(port)));
      } else {
        dispatch(removeMidiOutput({ id: port.id }));
      }
    }
  }

  function onMIDISuccess(midiAccess) {
    midiAccess.onstatechange = onMIDIAccessStateChange;
    const ports = Array.from(midiAccess.outputs.values());
    ports.map((p) => dispatch(addMidiOutput(createDataFromMIDIPort(p))));
    MIDIAccess = midiAccess;
  }

  function onMIDIFailure() {
    // Add error message
  }

  useEffect(() => {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  }, []);

  return midiOutputs;
}

export function useMidiSend() {
  const dispatch = useDispatch();

  const activatedMIDIOutputs = useSelector((state) => state.midiOutputs.filter((mo) => mo.activated === true));

  const rules = useSelector((state) => state.rules);

  function send(controllerIndexParam, buttonTypeParam, buttonIndexParam, buttonValueParam) {
    if (activatedMIDIOutputs.length === 0) return;

    rules.forEach((rule) => {
      const { activated, midiMessageType, midiMessageChannel, midiMessageValue1, midiMessageValue2, controllerIndex, buttonType, buttonIndex } = rule;

      if (!activated) return;
      if (controllerIndex !== controllerIndexParam) return;
      if (buttonType !== buttonTypeParam || buttonIndex !== buttonIndexParam) return;

      if ((midiMessageType === MIDI_TYPE_NOTE_ON && buttonValueParam === 1) || (midiMessageType === MIDI_TYPE_NOTE_OFF && buttonValueParam === 0)) {
        sendMidiNoteOnMessage(activatedMIDIOutputs, midiMessageChannel, midiMessageValue1, midiMessageValue2);
        dispatch(addLog(MIDI_TYPE_NOTE_ON, midiMessageChannel, midiMessageValue1, midiMessageValue2, controllerIndex, buttonType, buttonIndex));
      } else if ((midiMessageType === MIDI_TYPE_NOTE_ON && buttonValueParam === 0) || (midiMessageType === MIDI_TYPE_NOTE_OFF && buttonValueParam === 1)) {
        sendMidiNoteOffMessage(activatedMIDIOutputs, midiMessageChannel, midiMessageValue1, midiMessageValue2);
        dispatch(addLog(MIDI_TYPE_NOTE_OFF, midiMessageChannel, midiMessageValue1, midiMessageValue2, controllerIndex, buttonType, buttonIndex));
      } else if (midiMessageType === MIDI_TYPE_CC) {
        sendMidiCCMessage(activatedMIDIOutputs, midiMessageChannel, midiMessageValue1, Math.round(buttonValueParam * 127));
        dispatch(addLog(MIDI_TYPE_CC, midiMessageChannel, midiMessageValue1, Math.round(buttonValueParam * 127), controllerIndex, buttonType, buttonIndex));
      }
    });
  }

  return send;
}
