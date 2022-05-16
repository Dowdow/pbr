import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMidiOutput } from '../actions/midiOutputs';
import useMidiOutputs from '../hooks/midi';
import Gamepads from './Gamepads';
import Logs from './Logs';
import Rule from './Rule';
import RuleForm from './RuleForm';

export default function App() {
  const dispatch = useDispatch();

  const { selected: selectedMidiOutput, midiOutputs } = useMidiOutputs();

  const rules = useSelector((state) => state.rules);

  const handleChangeMidiOutput = (event) => {
    const { value } = event.target;
    dispatch(selectMidiOutput(value === '' ? null : value));
  };

  return (
    <div className="container mx-auto mb-96">
      <header className="w-full text-center my-2">
        <h1 className="text-2xl font-bold">PBR Gamepad MIDI System</h1>
        <div className="flex flex-row justify-center">
          <span className="mr-1">A</span>
          <a href="https://painboudinrecord.fr" target="_blank" rel="noreferrer" className="underline">Pain Boudin Record</a>
          <span className="ml-1">tool</span>
        </div>
      </header>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-1/2">
          <Gamepads />
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
            {rules.length === 0 ? <div>No rules for now</div> : null}
            {rules
              .sort((r1, r2) => r1.id - r2.id)
              .map((r) => <Rule key={r.id} rule={r} />)}
          </div>
          <RuleForm />
        </div>
      </div>
      <Logs />
    </div>
  );
}
