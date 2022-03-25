import { combineReducers } from 'redux';
import player from './player';
import songs from './songs';

const appReducer = combineReducers({
  player,
  songs,
});

export default appReducer;
