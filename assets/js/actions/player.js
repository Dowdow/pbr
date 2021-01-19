export const SET_PLAYER_CURRENT_SONG = 'SET_PLAYER_CURRENT_SONG';
export const SET_PLAYER_RADIO_MODE = 'SET_PLAYER_RADIO_MODE';

export function setPlayerCurrentSong(song) {
    return dispatch => dispatch({ type: SET_PLAYER_CURRENT_SONG, song });
}

export function setPlayerRadioMode(on) {
    return dispatch => dispatch({ type: SET_PLAYER_RADIO_MODE, on });
}