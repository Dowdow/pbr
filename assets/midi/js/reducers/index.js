import { combineReducers } from 'redux';
import gamepads from './gamepads';
import midiOutputs from './midiOutputs';
import rules from './rules';

const appReducer = combineReducers({
  gamepads,
  midiOutputs,
  rules,
});

export default appReducer;
