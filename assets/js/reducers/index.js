import {combineReducers} from 'redux';
import playing from './playing';
import posts from './posts';
import rank from './rank';
import songs from './songs';
import mixes from './mixes';
import user from './user';

const appReducer = combineReducers({
    playing,
    posts,
    rank,
    songs,
    mixes,
    user,
});

export default appReducer;
