import {combineReducers} from 'redux';
import playing from './playing';
import rank from './rank';
import user from './user';

const appReducer = combineReducers({
    playing,
    rank,
    user,
});

export default appReducer;
