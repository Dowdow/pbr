import { SET_RANK } from '../actions/rank';

export default function rank(state = [], action = {}) {
    switch (action.type) {
        case SET_RANK:
            return action.rank;
        default:
            return state;
    }
}