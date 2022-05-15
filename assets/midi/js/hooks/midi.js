import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMidiOutput, removeMidiOutput } from '../actions/midiOutputs';

let MIDIAccess = null;

function createDataFromMIDIPort(port) {
  return {
    id: port.id,
    manufacturer: port.manufacturer,
    name: port.name,
    version: port.version,
  };
}

function sendMidiMessage(MIDIOutputId, byte1, byte2, byte3) {
  const output = MIDIAccess.outputs.get(MIDIOutputId);
  if (output) {
    output.send([byte1, byte2, byte3]);
  }
}

function sendMidiNoteOnMessage(MIDIOutputId, channel, value1, value2) {
  sendMidiMessage(MIDIOutputId, 144 + channel, value1, value2);
}

function sendMidiNoteOffMessage(MIDIOutputId, channel, value1, value2) {
  sendMidiMessage(MIDIOutputId, 128 + channel, value1, value2);
}

function sendMidiCCMessage(MIDIOutputId, channel, value1, value2) {
  sendMidiMessage(MIDIOutputId, 176 + channel, value1, value2);
}

export default function useMidiOutputs() {
  const dispatch = useDispatch();

  const { selected, midiOutputs } = useSelector((state) => state.midiOutputs);

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

  return { selected, midiOutputs };
}

export function useMidiSend() {
  const selected = useSelector((state) => state.midiOutputs.selected);
  const rules = useSelector((state) => state.rules);

  function send(buttonType, buttonIndex, buttonValue) {
    rules.forEach((rule) => {
      const { activated, midiMessageType, midiMessageChannel, midiMessageValue1, midiMessageValue2, type, typeValue } = rule;

      if (!activated) return;

      if (type === buttonType && typeValue === buttonIndex) {
        if (midiMessageType === 0) { // Note On
          if (buttonValue === 0) {
            sendMidiNoteOffMessage(selected, midiMessageChannel, midiMessageValue1, midiMessageValue2);
          } else {
            sendMidiNoteOnMessage(selected, midiMessageChannel, midiMessageValue1, midiMessageValue2);
          }
        } else if (midiMessageType === 1) { // Note Off
          if (buttonValue === 0) {
            sendMidiNoteOnMessage(selected, midiMessageChannel, midiMessageValue1, midiMessageValue2);
          } else {
            sendMidiNoteOffMessage(selected, midiMessageChannel, midiMessageValue1, midiMessageValue2);
          }
        } else if (midiMessageType === 2) { // CC
          sendMidiCCMessage(selected, midiMessageChannel, midiMessageValue1, Math.round(buttonValue * 127));
        }
      }
    });
  }

  return send;
}
