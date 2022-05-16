import React, { useEffect, useState } from 'react';
import { useMidiSend } from '../hooks/midi';

export default function Button({ activated, controllerIndex, type, index, value }) {
  const send = useMidiSend();

  const [previous, setPrevious] = useState(null);

  const cappedValue = type === 0 ? Math.min(Math.max(value, 0), 1) : Math.min(Math.max(value, -1), 1);

  useEffect(() => {
    if (previous !== null && previous !== value && activated) {
      send(controllerIndex, type, index, type === 0 ? cappedValue : ((cappedValue + 1) / 2));
    }
    setPrevious(value);
  }, [value]);

  const y2 = 40 - ((type === 0 ? cappedValue : ((cappedValue + 1) / 2)) * 40);

  return (
    <div className="flex flex-row mx-2 mb-2 w-16">
      <svg className="relative mr-2 w-2 h-10 bg-gray-200">
        <line x1="4" y1={type === 0 ? '40' : '20'} x2="4" y2={y2} strokeWidth="8" stroke="black" />
      </svg>
      <div className="flex flex-col">
        <span className="text-sm">{`${type === 0 ? 'B' : 'Axis '}${index}`}</span>
        <span className="font-bold">{(Math.round((value + Number.EPSILON) * 100) / 100).toFixed(2)}</span>
      </div>
    </div>
  );
}
