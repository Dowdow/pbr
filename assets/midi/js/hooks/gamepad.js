import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGamepad, removeGamepad } from '../actions/gamepads';

export default function useGamepads() {
  const dispatch = useDispatch();

  const gamepads = useSelector((state) => state.gamepads);

  function gamepadConnected(event) {
    const { gamepad } = event;
    dispatch(addGamepad({ id: gamepad.id, index: gamepad.index }));
  }

  function gamepadDisconnected(event) {
    const { gamepad } = event;
    dispatch(removeGamepad({ id: gamepad.id, index: gamepad.index }));
  }

  useEffect(() => {
    window.addEventListener('gamepadconnected', gamepadConnected);
    window.addEventListener('gamepaddisconnected', gamepadDisconnected);

    return () => {
      window.removeEventListener('gamepadconnected');
      window.removeEventListener('gamepaddisconnected');
    };
  }, []);

  return gamepads;
}
