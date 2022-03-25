export const ADD_SONG_PLAYS = 'ADD_SONG_PLAYS';

export function addCurrentSongPlays() {
  return (dispatch, getState) => {
    const { currentSong } = getState().player;
    dispatch({ type: ADD_SONG_PLAYS, id: currentSong.id });
  };
}
