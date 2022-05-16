import React from 'react';
import { useDispatch } from 'react-redux';
import Gamepads from './Gamepads';
import Logs from './Logs';
import MIDIOutputs from './MIDIOutputs';
import Rules from './Rules';

export default function App() {
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
          <MIDIOutputs />
          <Rules />
        </div>
      </div>
      <Logs />
    </div>
  );
}
