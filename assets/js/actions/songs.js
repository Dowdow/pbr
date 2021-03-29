export const ADD_SONG_PLAYS = 'ADD_SONG_PLAYS';

export function addSongPlays(id) {
    return dispatch => dispatch({ type: ADD_SONG_PLAYS, id })
}