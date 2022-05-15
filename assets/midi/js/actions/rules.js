export const RULES_ADD = 'RULES_ADD';
export const RULES_REMOVE = 'RULES_REMOVE';
export const RULES_TOGGLE_ACTIVATED = 'RULES_TOGGLE_ACTIVATED';

export function addRule(rule) {
  return (dispatch) => dispatch({ type: RULES_ADD, rule });
}

export function removeRule(id) {
  return (dispatch) => dispatch({ type: RULES_REMOVE, id });
}

export function toggleRuleActivated(id) {
  return (dispatch) => dispatch({ type: RULES_TOGGLE_ACTIVATED, id });
}
