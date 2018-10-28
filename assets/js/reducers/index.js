import { combineReducers } from 'redux';
import playing from './playing';
import user from './user';

const appReducer = combineReducers({
    playing,
    user,
});

export default appReducer;
