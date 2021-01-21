import { SET_PLAYER_CURRENT_SONG, SET_PLAYER_PLAYING, SET_PLAYER_RADIO_MODE } from '../actions/player';

const init = { currentSong: null, playing: false, radioMode: false };

export default function player(state = init, action = {}) {
    switch (action.type) {
        case SET_PLAYER_CURRENT_SONG:
            return { ...state, currentSong: action.song };
        case SET_PLAYER_PLAYING:
            return { ...state, playing: action.playing };
        case SET_PLAYER_RADIO_MODE:
            return { ...state, radioMode: action.on };
        default:
            return state;
    }
}