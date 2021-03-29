export const SET_PLAYER_CURRENT_SONG = 'SET_PLAYER_CURRENT_SONG';
export const SET_PLAYER_PLAYING = 'SET_PLAYER_PLAYING';
export const SET_PLAYER_SHUFFLE_MODE = 'SET_PLAYER_SHUFFLE_MODE';

export function setPlayerCurrentSong(song) {
    return dispatch => dispatch({ type: SET_PLAYER_CURRENT_SONG, song });
}

export function setPlayerPlaying(playing) {
    return dispatch => dispatch({ type: SET_PLAYER_PLAYING, playing });
}

export function setPlayerShuffle(on) {
    return dispatch => dispatch({ type: SET_PLAYER_SHUFFLE_MODE, on });
}

export function setNewTrack() {
    return (dispatch, getState) => {
        const songs = getState().songs;
        const { currentSong, shuffle } = getState().player;

        let nextSong = null;
        if (shuffle) {
            const plays = songs.map(song => song.plays);
            const min = Math.min(...plays);
            const potentialNextSongs = songs.filter(song => song.plays === min);
            nextSong = potentialNextSongs[Math.floor(Math.random() * potentialNextSongs.length)];
        } else {
            const firstSong = songs.filter(song => song.order === 0);
            const potentialNextSong = songs.filter(song => song.order === currentSong.order + 1);
            nextSong = potentialNextSong.length === 0 ? firstSong[0] : potentialNextSong[0];
        }

        dispatch({ type: SET_PLAYER_CURRENT_SONG, song: nextSong });
    }
}