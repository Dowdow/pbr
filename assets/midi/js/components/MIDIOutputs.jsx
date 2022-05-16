import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleMidiOutputActivated } from '../actions/midiOutputs';
import useMidiOutputs from '../hooks/midi';

export default function MIDIOutputs() {
  const midiOutputs = useMidiOutputs();

  return (
    <div className="flex flex-col">
      <h2 className="text-center text-lg font-bold">MIDI Output</h2>
      {midiOutputs.length === 0 ? <h5 className="text-center text-lg font-bold mt-2">No MIDI Outputs found</h5> : null}
      <div className="flex flex-row flex-wrap justify-evenly mt-2">
        {midiOutputs.map((mo) => <MIDIOutput key={mo.id} id={mo.id} activated={mo.activated} manufacturer={mo.manufacturer} name={mo.name} version={mo.version} />)}
      </div>
    </div>
  );
}

function MIDIOutput({ id, activated, manufacturer, name, version }) {
  const dispatch = useDispatch();

  const handleToggleActivation = (i) => {
    dispatch(toggleMidiOutputActivated(i));
  };

  return (
    <div className={`flex flex-col p-2 mx-1 mb-2 bg-gray-200 border-t-4 ${activated ? 'border-green-400' : 'border-red-500'}`}>
      <h3 className="font-bold truncate">{name}</h3>
      <h4 className="text-sm truncate">{manufacturer}</h4>
      <h5 className="text-xs truncate">{version}</h5>
      <button type="button" onClick={() => handleToggleActivation(id)} className="self-center underline">{activated ? 'Stop' : 'Start'}</button>
    </div>
  );
}
