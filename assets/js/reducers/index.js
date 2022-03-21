import { combineReducers } from 'redux';
import admin from './admin';
import player from './player';
import songs from './songs';
import transitions from './transitions';
import user from './user';

const appReducer = combineReducers({
    admin,
    player,
    songs,
    transitions,
    user,
});

export default appReducer;
