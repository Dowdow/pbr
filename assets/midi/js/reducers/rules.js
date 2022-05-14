import { RULES_ADD, RULES_REMOVE } from '../actions/rules';

export default function rules(state = [], action = {}) {
  switch (action.type) {
    case RULES_ADD:
      return [...state, action.rule];
    case RULES_REMOVE:
      return state.filter((r) => r.id !== action.id);
    default:
      return state;
  }
}
