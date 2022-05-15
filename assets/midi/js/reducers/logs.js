import { LOGS_ADD, LOGS_CLEAR } from '../actions/logs';

export default function logs(state = [], action = {}) {
  switch (action.type) {
    case LOGS_ADD:
      return [...state.sort((a, b) => a.id - b.id).slice(-19), action.log];
    case LOGS_CLEAR:
      return [];
    default:
      return state;
  }
}
