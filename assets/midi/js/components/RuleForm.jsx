import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRule } from '../actions/rules';
import { MIDI_TYPE_CC, MIDI_TYPE_NOTE_OFF, MIDI_TYPE_NOTE_ON } from '../utils/midi';

export default function RuleForm() {
  const dispatch = useDispatch();

  const [midiMessageType, setMidiMessageType] = useState(MIDI_TYPE_NOTE_ON);
  const [midiMessageChannel, setMidiMessageChannel] = useState(0);
  const [midiMessageValue1, setMidiMessageValue1] = useState(127);
  const [midiMessageValue2, setMidiMessageValue2] = useState(127);

  const [controllerIndex, setControllerIndex] = useState(0);
  const [buttonType, setButtonType] = useState(0);
  const [buttonIndex, setButtonIndex] = useState(0);

  const handleMidiMessageTypeChange = (event) => {
    setMidiMessageType(parseInt(event.target.value, 10));
  };

  const handleMidiMessageChannelChange = (event) => {
    setMidiMessageChannel(parseInt(event.target.value, 10));
  };

  const handleMidiMessageValue1Change = (event) => {
    setMidiMessageValue1(parseInt(event.target.value, 10));
  };

  const handleMidiMessageValue2Change = (event) => {
    setMidiMessageValue2(parseInt(event.target.value, 10));
  };

  const handleControllerIndexChange = (event) => {
    setControllerIndex(parseInt(event.target.value, 10));
  };

  const handleButtonTypeChange = (event) => {
    setButtonType(parseInt(event.target.value, 10));
  };

  const handleButtonIndexChange = (event) => {
    setButtonIndex(parseInt(event.target.value, 10));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addRule({
      id: Date.now(),
      activated: true,
      midiMessageType,
      midiMessageChannel,
      midiMessageValue1,
      midiMessageValue2,
      controllerIndex,
      buttonType,
      buttonIndex,
    }));
  };

  return (
    <div className="mt-5">
      <h3 className="text-lg font-bold mb-4 text-center">New Rule</h3>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex flex-row justify-center mb-4">
          <div className="flex flex-col mr-4">
            <label>MIDI Message</label>
            <select value={midiMessageType} onChange={handleMidiMessageTypeChange}>
              <option value={MIDI_TYPE_NOTE_ON}>Note ON</option>
              <option value={MIDI_TYPE_NOTE_OFF}>Note OFF</option>
              <option value={MIDI_TYPE_CC}>Continuous Control</option>
            </select>
          </div>
          <div className="flex flex-col mr-4">
            <label>MIDI Channel</label>
            <select value={midiMessageChannel} onChange={handleMidiMessageChannelChange}>
              {[...Array(16).keys()].map((v) => <option key={v} value={v}>{v + 1}</option>)}
            </select>
          </div>
          <div className="flex flex-col mr-4">
            <label>MIDI Value 1</label>
            <select value={midiMessageValue1} onChange={handleMidiMessageValue1Change}>
              {[...Array(128).keys()].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <label>MIDI Value 2</label>
            <select value={midiMessageValue2} onChange={handleMidiMessageValue2Change}>
              {[...Array(128).keys()].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col mr-4">
            <label>Controller Number</label>
            <input type="number" min={0} value={controllerIndex} step={1} onChange={handleControllerIndexChange} className="p-1 w-36 bg-gray-200" />
          </div>
          <div className="flex flex-col mr-4">
            <label>Button or Axe</label>
            <select value={buttonType} onChange={handleButtonTypeChange}>
              <option value={0}>Button</option>
              <option value={1}>Axe</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>Button/Axe Number</label>
            <input type="number" min={0} value={buttonIndex} step={1} onChange={handleButtonIndexChange} className="p-1 w-36 bg-gray-200" />
          </div>
        </div>
        <button type="submit" className="bg-gray-300 text-lg font-bold p-2 mt-4">Add</button>
      </form>
    </div>
  );
}
