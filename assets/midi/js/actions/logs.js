export const LOGS_ADD = 'LOGS_ADD';
export const LOGS_CLEAR = 'LOGS_CLEAR';

export function addLog(midiMessageType, midiMessageChannel, midiMessageValue1, midiMessageValue2, controllerIndex, buttonType, buttonIndex) {
  return (dispatch) => dispatch({
    type: LOGS_ADD,
    log: {
      id: Date.now(),
      data: {
        midiMessageType, midiMessageChannel, midiMessageValue1, midiMessageValue2, controllerIndex, buttonType, buttonIndex,
      },
    },
  });
}

export function clearLogs() {
  return (dispatch) => dispatch({ type: LOGS_CLEAR });
}
