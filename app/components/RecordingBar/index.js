// @flow
import React, { Component } from 'react';
import { Button } from 'antd';

import './style.scss';

type Props = {
  isLoading: boolean,
  isRecording: boolean,
  isPaused: boolean,
  onRecordClick: void => void
};

export default class RecordingBar extends Component<Props> {
  props: Props;

  render() {
    const { isLoading, isRecording, isPaused, onRecordClick } = this.props;

    return (
      <div className="recording-bar">
        {isRecording ? (
          <>
            <Button
              loading={isLoading}
              type="danger"
              icon="stop"
              onClick={() => onRecordClick()}
            >
              Stop Recording
            </Button>
            {isPaused ? (
              <Button
                loading={isLoading}
                type="primary"
                icon="play-circle"
                onClick={() => onRecordClick()}
              >
                Resume
              </Button>
            ) : (
              <Button
                loading={isLoading}
                type="primary"
                icon="pause-circle"
                onClick={() => onRecordClick()}
              >
                Pause
              </Button>
            )}
          </>
        ) : (
          <Button
            loading={isLoading}
            type="primary"
            icon="video-camera"
            onClick={() => onRecordClick()}
          >
            Start Recording
          </Button>
        )}
      </div>
    );
  }
}
