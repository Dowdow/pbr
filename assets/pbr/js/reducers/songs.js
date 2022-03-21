import { ADD_SONG_PLAYS } from '../actions/songs';

export default function songs(state = [], action = {}) {
    switch (action.type) {
        case ADD_SONG_PLAYS:
            const index = state.findIndex(s => s.id === action.id);
            if (index !== -1) {
                state[index].plays += 1;
            }
            return [...state];
        default:
            return state;
    }
}