import { init } from '../reducers/player';

export function loadState() {
  try {
    const serializeState = localStorage.getItem('state');
    if (serializeState === null) {
      return undefined;
    }
    return JSON.parse(serializeState);
  } catch (err) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serializeState = JSON.stringify(state);
    localStorage.setItem('state', serializeState);
    return true;
  } catch (err) {
    return err;
  }
}

export function subscribeLocalStorage(store) {
  store.subscribe(() => {
    const state = store.getState();

    const player = { ...init };
    player.shuffle = state.player.shuffle;
    player.volume = state.player.volume;

    saveState({
      player,
    });
  });
}
