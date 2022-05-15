export const LOGS_ADD = 'LOGS_ADD';
export const LOGS_CLEAR = 'LOGS_CLEAR';

export function addLog(log) {
  return (dispatch) => dispatch({ type: LOGS_ADD, log });
}

export function clearLogs() {
  return (dispatch) => dispatch({ type: LOGS_CLEAR });
}
