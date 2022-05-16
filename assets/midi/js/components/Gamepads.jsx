import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleGamepadActivated } from '../actions/gamepads';
import useGamepads from '../hooks/gamepad';
import Gamepad from './Gamepad';

export default function Gamepads() {
  const dispatch = useDispatch();

  const gamepads = useGamepads();

  const [gamepadData, setGamepadData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGamepadData(navigator.getGamepads());
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleToggleActivation = (index) => {
    dispatch(toggleGamepadActivated(index));
  };

  return (
    <div>
      <h2 className="text-center text-lg font-bold">Gamepad controllers</h2>
      {gamepads.length === 0 ? <h5 className="text-center text-2xl font-bold mt-10">Connect a gamepad and press a button to start</h5> : null}
      <div className="flex flex-row justify-evenly mt-2">
        {gamepads
          .sort((a, b) => a.index - b.index)
          .map((g) => (
            <div key={g.index} className={`flex flex-col w-1/4 p-2 bg-gray-200 border-t-4 ${g.activated ? 'border-green-400' : 'border-red-500'}`}>
              <span>
                Controller
                <span className="ml-1 font-bold">{g.index}</span>
              </span>
              <h4 className=" font-bold truncate">{g.id}</h4>
              <button type="button" onClick={() => handleToggleActivation(g.index)} className="self-center underline">{g.activated ? 'Stop' : 'Start'}</button>
            </div>
          ))}
      </div>
      <div>
        {gamepads
          .sort((a, b) => a.index - b.index)
          .map((g) => <Gamepad key={g.index} activated={g.activated} data={gamepadData ? gamepadData[g.index] : null} />)}
      </div>
    </div>
  );
}
