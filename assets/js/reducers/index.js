import { combineReducers } from 'redux';
import admin from './admin';
import player from './player';
import rank from './rank';
import songs from './songs';
import transitions from './transitions';
import user from './user';
import videos from './videos';

const appReducer = combineReducers({
    admin,
    player,
    rank,
    songs,
    transitions,
    user,
    videos
});

export default appReducer;
