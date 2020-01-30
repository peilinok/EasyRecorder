export const RECORDER_START = 'RECORDER_START';
export const RECORDER_STOP = 'RECORDER_STOP';
export const RECORDER_PAUSE = 'RECORDER_PAUSE';
export const RECORDER_RESUME = 'RECORDER_RESUME';

export function recorderStart(filePath: string) {
  return {
    type: RECORDER_START,
    payload: { filePath }
  };
}

export function recorderStop() {
  return { type: RECORDER_STOP };
}

export function recorderPause() {
  return { type: RECORDER_PAUSE };
}

export function recorderResume() {
  return { type: RECORDER_RESUME };
}
