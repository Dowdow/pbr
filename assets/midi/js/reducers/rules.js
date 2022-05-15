import { RULES_ADD, RULES_REMOVE, RULES_TOGGLE_ACTIVATED } from '../actions/rules';

export default function rules(state = [], action = {}) {
  switch (action.type) {
    case RULES_ADD:
      return [...state, action.rule];
    case RULES_REMOVE:
      return state.filter((r) => r.id !== action.id);
    case RULES_TOGGLE_ACTIVATED: {
      const indexRule = state.findIndex((r) => r.id === action.id);
      if (indexRule !== -1) {
        const rule = { ...state[indexRule] };
        state.splice(indexRule, 1);
        rule.activated = !rule.activated;
        return [...state, rule];
      }
      return state;
    }
    default:
      return state;
  }
}
