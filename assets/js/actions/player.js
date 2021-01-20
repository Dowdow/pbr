import { func } from "prop-types";

export const SET_PLAYER_CURRENT_SONG = 'SET_PLAYER_CURRENT_SONG';
export const SET_PLAYER_PLAYING = 'SET_PLAYER_PLAYING';
export const SET_PLAYER_RADIO_MODE = 'SET_PLAYER_RADIO_MODE';

export function setPlayerCurrentSong(song) {
    return dispatch => dispatch({ type: SET_PLAYER_CURRENT_SONG, song });
}

export function setPlayerPlaying(playing) {
    return dispatch => dispatch({ type: SET_PLAYER_PLAYING, playing });
}

export function setPlayerRadioMode(on) {
    return dispatch => dispatch({ type: SET_PLAYER_RADIO_MODE, on });
}

export function setNewRandomTrackRadioMode() {
    return (dispatch, getState) => {
        const { radioMode } = getState().player;
        if (radioMode) {
            const songs = getState().songs;
            const currentSong = getState().player.currentSong;
            let index = null;
            do {
                index = Math.floor(Math.random() * songs.length);
            } while (songs[index].id === currentSong.id);

            dispatch({ type: SET_PLAYER_CURRENT_SONG, song: songs[index] });
        } else {
            dispatch({ type: SET_PLAYER_PLAYING, playing: false });
        }
    }
}