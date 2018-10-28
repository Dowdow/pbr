import {SET_PLAYING} from '../actions/playing';

export default function playing(state = false, action = {}) {
    switch (action.type) {
        case SET_PLAYING:
            return action.playing;
        default:
            return state;
    }
}