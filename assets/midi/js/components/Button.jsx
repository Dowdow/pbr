import React, { useEffect, useState } from 'react';
import { useMidiSend } from '../hooks/midi';

export default function Button({ type, index, value }) {
  const send = useMidiSend();

  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    if (previous !== null && previous !== value) {
      send(type, index, type === 0 ? value : ((value + 1) / 2));
    }
    setPrevious(value);
  }, [value]);

  return (
    <div>{`Index:${index} - Value Normalised:${type === 0 ? value : ((value + 1) / 2)} - Value:${value}`}</div>
  );
}
