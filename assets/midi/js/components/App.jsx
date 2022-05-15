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
    <div className="container mx-auto">
      <header className="w-full text-center my-2">
        <h1 className="text-2xl font-bold">PBR Gamepad MIDI System</h1>
      </header>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-1/2">
          <h2 className="text-center text-lg font-bold">Gamepad controller</h2>
          <div className="mt-2 mx-auto">
            <select value={selectedGamepad} onChange={handleChangeGamepad} className="max-w-xs">
              <option value="">Select a Gamepad</option>
              {gamepads.map((g) => <option key={g.index} value={g.index}>{g.id}</option>)}
            </select>
          </div>
          <Gamepad index={selectedGamepad} />
        </div>
        <div className="flex flex-col w-1/2">
          <h2 className="text-center text-lg font-bold">MIDI Output</h2>
          <div className="mt-2 mx-auto">
            <select value={selectedMidiOutput} onChange={handleChangeMidiOutput}>
              <option value="">Select a MIDI Output</option>
              {midiOutputs.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <h3 className="text-lg font-bold mt-5 mb-4 text-center">Your Rules</h3>
          <div className="flex flex-row flex-wrap justify-center">
            {rules
              .sort((r1, r2) => r1.id - r2.id)
              .map((r) => <Rule key={r.id} rule={r} />)}
          </div>
          <RuleForm />
        </div>
      </div>
    </div>
  );
}
