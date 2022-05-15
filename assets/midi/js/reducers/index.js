import { combineReducers } from 'redux';
import gamepads from './gamepads';
import logs from './logs';
import midiOutputs from './midiOutputs';
import rules from './rules';

const appReducer = combineReducers({
  gamepads,
  logs,
  midiOutputs,
  rules,
});

export default appReducer;
