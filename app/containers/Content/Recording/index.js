import React, { Component } from 'react';
import { shell } from 'electron';
import { connect } from 'react-redux';

import recorder from '../../../utils/recorder';
import storage from '../../../utils/storage';

import RecordingBar from '../../../components/RecordingBar';
import RecordingPreview from '../../../components/RecordingPreview';

import './style.scss';

type Props = {
  isRecording: boolean,
  isPaused: boolean,
  startTime: number
};

class RecordingLayout extends Component<Props> {
  props: Props;

  render() {
    const { isRecording, isPaused, startTime } = this.props;
    return (
      <div className="recording-layout">
        <RecordingBar
          isLoading={false}
          isPaused={isPaused}
          isRecording={isRecording}
          startTime={startTime}
          onRecordClick={action => {
            switch (action) {
              case 'start':
                recorder.start();
                recorder.enablePreview(true);
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
          onFolderClick={() => {
            shell.showItemInFolder(`${storage.getOutputDir()}\\abc.mp4`);
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
    isPaused: state.recorder.isPaused,
    startTime: state.recorder.startTime
  };
}

export default connect(mapStateToProps)(RecordingLayout);
