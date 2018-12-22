import {combineReducers} from 'redux';
import playing from './playing';
import posts from './posts';
import rank from './rank';
import songs from './songs';
import user from './user';

const appReducer = combineReducers({
    playing,
    posts,
    rank,
    songs,
    user,
});

export default appReducer;
