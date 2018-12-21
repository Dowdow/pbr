import {combineReducers} from 'redux';
import playing from './playing';
import rank from './rank';
import songs from './songs';
import user from './user';

const appReducer = combineReducers({
    playing,
    rank,
    songs,
    user,
});

export default appReducer;
