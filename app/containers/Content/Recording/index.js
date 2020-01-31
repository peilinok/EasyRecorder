import React, { Component } from 'react';
import { connect } from 'react-redux';

import recorder from '../../../utils/recorder';

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
                recorder.start();
                break;
              case 'stop':
                recorder.stop();
                break;
              case 'pause':
                recorder.pause();
                break;
              case 'resume':
                recorder.resume();
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
