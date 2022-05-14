import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGamepad } from '../actions/gamepads';
import { selectMidiOutput } from '../actions/midiOutputs';
import useGamepads from '../hooks/gamepad';
import useMidiOutputs from '../hooks/midi';
import Gamepad from './Gamepad';
import Rule from './Rule';
import RuleForm from './RuleForm';

export default function App() {
  const dispatch = useDispatch();

  const { selected: selectedGamepad, gamepads } = useGamepads();
  const { selected: selectedMidiOutput, midiOutputs } = useMidiOutputs();

  const rules = useSelector((state) => state.rules);

  const handleChangeGamepad = (event) => {
    const { value } = event.target;
    dispatch(selectGamepad(value === '' ? null : parseInt(value, 10)));
  };

  const handleChangeMidiOutput = (event) => {
    const { value } = event.target;
    dispatch(selectMidiOutput(value === '' ? null : value));
  };

  return (
    <div>
      <header>PBR Gamepad MIDI System</header>
      <div className="container">
        <div>
          <h2>Gamepad controller</h2>
          <select value={selectedGamepad} onChange={handleChangeGamepad}>
            <option value="">Select a Gamepad</option>
            {gamepads.map((g) => <option key={g.index} value={g.index}>{g.id}</option>)}
          </select>
          <Gamepad index={selectedGamepad} />
        </div>
        <div>
          <h2>MIDI Output</h2>
          <select value={selectedMidiOutput} onChange={handleChangeMidiOutput}>
            <option value="">Select a MIDI Output</option>
            {midiOutputs.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          {rules.map((r) => <Rule key={r.id} rule={r} />)}
          <RuleForm />
        </div>
      </div>
    </div>
  );
}
