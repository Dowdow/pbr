import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRule } from '../actions/rules';

export default function RuleForm() {
  const dispatch = useDispatch();

  const [midiMessageType, setMidiMessageType] = useState(0);
  const [midiMessageChannel, setMidiMessageChannel] = useState(0);
  const [midiMessageValue1, setMidiMessageValue1] = useState(0);
  const [midiMessageValue2, setMidiMessageValue2] = useState(0);

  const [type, setType] = useState(0);
  const [typeValue, setTypeValue] = useState(0);

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

  const handleTypeChange = (event) => {
    setType(parseInt(event.target.value, 10));
  };

  const handleTypeValueChange = (event) => {
    setTypeValue(parseInt(event.target.value, 10));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addRule({
      id: Date.now(),
      midiMessageType,
      midiMessageChannel,
      midiMessageValue1,
      midiMessageValue2,
      type,
      typeValue,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <select value={midiMessageType} onChange={handleMidiMessageTypeChange}>
          <option value={0}>Note ON</option>
          <option value={1}>Note OFF</option>
          <option value={2}>Continuous Control</option>
        </select>
        <select value={midiMessageChannel} onChange={handleMidiMessageChannelChange}>
          {[...Array(16).keys()].map((v) => <option key={v} value={v}>{v + 1}</option>)}
        </select>
        <select value={midiMessageValue1} onChange={handleMidiMessageValue1Change}>
          {[...Array(128).keys()].map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
        <select value={midiMessageValue2} onChange={handleMidiMessageValue2Change}>
          {[...Array(128).keys()].map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>
      <div>
        <select value={type} onChange={handleTypeChange}>
          <option value={0}>Button</option>
          <option value={1}>Axe</option>
        </select>
        <input type="number" min={0} value={typeValue} step={1} onChange={handleTypeValueChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
