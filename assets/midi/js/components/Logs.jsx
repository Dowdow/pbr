import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearLogs } from '../actions/logs';
import { midiTypeNameFromId } from '../utils/midi';

export default function Logs() {
  const dispatch = useDispatch();

  const logs = useSelector((state) => state.logs);

  const handleClearLogs = () => {
    dispatch(clearLogs());
  };

  return (
    <div className="fixed bottom-0 left-0 w-full md:w-1/2 lg:w-1/3 h-72 bg-gray-200">
      <div className="flex flex-row justify-between mx-2">
        <h4 className="font-bold">Logs</h4>
        <button type="button" onClick={handleClearLogs} className="underline">Clear</button>
      </div>
      <div className="flex flex-col w-full h-72 overflow-y-scroll">
        {logs
          .sort((a, b) => b.id - a.id)
          .map((l, index) => <Log key={`${l.id}-${index}`} id={l.id} data={l.data} />)}
      </div>
    </div>
  );
}

function Log({ id, data }) {
  const date = new Date(id);
  return (
    <div className="flex flex-row justify-between px-2">
      <span className="w-28 text-blue-600">{`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}:${date.getMilliseconds().toString().padStart(3, '0')}`}</span>
      <span className="w-20 uppercase">{midiTypeNameFromId(data.type)}</span>
      <span className="w-9">{`CH${data.channel}`}</span>
      <span className="w-8 text-center">{data.value1}</span>
      <span className="w-8 text-center">{data.value2}</span>
      <span className="w-8">{`${data.buttonType === 0 ? 'B' : 'A'}${data.buttonValue}`}</span>
    </div>
  );
}
