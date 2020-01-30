// @flow
import {
  RECORDER_START,
  RECORDER_STOP,
  RECORDER_PAUSE,
  RECORDER_RESUME
} from '../actions/recorder';
import type { Action, RecorderStateType } from './types';

export default function recorder(
  state: RecorderStateType = {
    isPaused: false,
    isRecording: false,
    curFilePath: ''
  },
  action: Action
) {
  switch (action.type) {
    case RECORDER_START:
      return { ...state, isRecording: true, curFile: action.payload.filePath };
    case RECORDER_STOP:
      return { ...state, isRecording: false, curFile: '' };
    case RECORDER_PAUSE:
      return { ...state, isPaused: true };
    case RECORDER_RESUME:
      return { ...state, isPaused: false };
    default:
      return state;
  }
}
