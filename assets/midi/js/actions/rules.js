export const RULES_ADD = 'RULES_ADD';
export const RULES_REMOVE = 'RULES_REMOVE';

export function addRule(rule) {
  return (dispatch) => dispatch({ type: RULES_ADD, rule });
}

export function removeRule(id) {
  return (dispatch) => dispatch({ type: RULES_REMOVE, id });
}
