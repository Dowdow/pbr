import {SET_SCORE} from '../actions/user';

export default function user(state = false, action = {}) {
    switch (action.type) {
        case SET_SCORE:
            const newUser = Object.assign({}, state);
            newUser.score = action.score;
            return newUser;
        default:
            return state;
    }
}