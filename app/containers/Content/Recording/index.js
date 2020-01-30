import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  recorderStart,
  recorderStop,
  recorderPause,
  recorderResume
} from '../../../actions/recorder';

import { configuredStore } from '../../../store/configureStore';

import RecordingBar from '../../../components/RecordingBar';
import RecordingPreview from '../../../components/RecordingPreview';

import './style.scss';

type Props = {
  isRecording: boolean,
  isPaused: boolean
};

class RecordingLayout extends Component<Props> {
  props: Props;

  render() {
    const { isRecording, isPaused } = this.props;
    return (
      <div className="recording-layout">
        <RecordingBar
          isLoading={false}
          isPaused={isPaused}
          isRecording={isRecording}
          onRecordClick={action => {
            switch (action) {
              case 'start':
                configuredStore.dispatch(recorderStart('sdf'));
                break;
              case 'stop':
                configuredStore.dispatch(recorderStop());
                break;
              case 'pause':
                configuredStore.dispatch(recorderPause());
                break;
              case 'resume':
                configuredStore.dispatch(recorderResume());
                break;
              default:
                break;
            }
          }}
        />
        <RecordingPreview />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isRecording: state.recorder.isRecording,
    isPaused: state.recorder.isPaused
  };
}

export default connect(mapStateToProps)(RecordingLayout);
