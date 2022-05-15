import React, { useEffect, useState } from 'react';
import { useMidiSend } from '../hooks/midi';

export default function Button({ type, index, value }) {
  const send = useMidiSend();

  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    if (previous !== null && previous !== value) {
      const cappedValue = type === 0 ? Math.min(Math.max(value, 0), 1) : Math.min(Math.max(value, -1), 1);
      send(type, index, type === 0 ? cappedValue : ((cappedValue + 1) / 2));
    }
    setPrevious(value);
  }, [value]);

  return (
    <div>{`Index:${index} - Value Normalised:${type === 0 ? value : ((value + 1) / 2)} - Value:${value}`}</div>
  );
}
