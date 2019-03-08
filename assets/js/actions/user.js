import {setRank} from './rank';

export const SET_SCORE = 'SET_SCORE';

export function setScore(s) {
    return {
        type: SET_SCORE,
        score: s,
    };
}

export function grantScore() {
    return (dispatch) => {
        fetch('/score', {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                dispatch(setScore(data.score));
                dispatch(setRank(data.rank));
            })
            .catch(() => {
                console.log('Error while trying to grant score');
            });
    };
}