export const SET_RANK = 'SET_RANK';

export function setRank(r) {
    return {
        type: SET_RANK,
        rank: r,
    };
}