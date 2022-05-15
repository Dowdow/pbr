import React, { useEffect, useState } from 'react';
import Button from './Button';

export default function Gamepad({ index }) {
  const [gamepad, setGamepad] = useState(null);

  useEffect(() => {
    let interval = null;
    if (index !== null) {
      interval = setInterval(() => {
        setGamepad(navigator.getGamepads()[index]);
      }, 10);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [index]);

  if (index === null || gamepad === null) {
    return null;
  }

  return (
    <div className="flex flex-col mt-5">
      <h3 className="text-lg font-bold mx-2 mb-4">{gamepad.id}</h3>
      <div className="flex flex-row flex-wrap">
        {gamepad.buttons.map((button, i) => <Button key={`button-${index}-${i}`} type={0} index={i} value={button.value} />)}
      </div>
      <div className="flex flex-row flex-wrap mt-2">
        {gamepad.axes.map((axe, i) => <Button key={`axe-${index}-${i}`} type={1} index={i} value={axe} />)}
      </div>
    </div>
  );
}
