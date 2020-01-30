import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type RecorderStateType = {
  +isPaused: boolean,
  +isRecording: boolean,
  +curFile: string
};

export type StateType = {
  +recorder: RecorderStateType
};

export type Action = {
  +type: string,
  // eslint-disable-next-line flowtype/no-weak-types
  +payload?: any
};

export type GetState = () => StateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
