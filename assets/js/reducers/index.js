import {combineReducers} from 'redux';
import admin from './admin';
import eps from './eps';
import mixes from './mixes';
import playing from './playing';
import posts from './posts';
import rank from './rank';
import songs from './songs';
import user from './user';
import videos from './videos';

const appReducer = combineReducers({
    admin,
    eps,
    mixes,
    playing,
    posts,
    rank,
    songs,
    user,
    videos
});

export default appReducer;
