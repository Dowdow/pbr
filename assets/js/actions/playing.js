export const SET_PLAYING = 'SET_PLAYING';

export function setPlaying(p) {
    return {
        type: SET_PLAYING,
        playing: p,
    };
}

export function setPlayerPlaying(p) {
    return (dispatch) => {
        dispatch(setPlaying(p));
    };
}