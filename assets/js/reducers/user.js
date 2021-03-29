import { SET_SCORE } from '../actions/user';

export default function user(state = false, action = {}) {
    switch (action.type) {
        case SET_SCORE:
            return { ...state, score: action.score };
        default:
            return state;
    }
}