// @flow
import React, { Component } from 'react';
import CustomButton from '../CustomButton';

import './style.scss';

type OP = 'start' | 'stop' | 'pause' | 'resume';

type Props = {
  isLoading: boolean,
  isRecording: boolean,
  isPaused: boolean,
  onRecordClick: OP => void,
  onFolderClick: () => void
};

export default class RecordingBar extends Component<Props> {
  props: Props;

  render() {
    const {
      isLoading,
      isRecording,
      isPaused,
      onRecordClick,
      onFolderClick
    } = this.props;

    return (
      <div className="recording-bar">
        <CustomButton
          visible={isRecording === false}
          title="Start Recording"
          loading={isLoading}
          type="primary"
          icon="video-camera"
          onClick={() => onRecordClick('start')}
        />

        <CustomButton
          visible={isRecording}
          title="Stop Recording"
          loading={isLoading}
          type="danger"
          icon="stop"
          onClick={() => onRecordClick('stop')}
        />

        <CustomButton
          visible={isRecording && isPaused}
          title="Resume"
          loading={isLoading}
          type="primary"
          icon="play-circle"
          onClick={() => onRecordClick('resume')}
        />

        <CustomButton
          visible={isRecording && !isPaused}
          title="Pause"
          loading={isLoading}
          type="primary"
          icon="pause-circle"
          onClick={() => onRecordClick('pause')}
        />

        <div style={{ flexGrow: 1 }} />

        <CustomButton
          visible
          title="Explore to"
          isIconButton
          icon="folder-open"
          onClick={onFolderClick}
        />
      </div>
    );
  }
}
