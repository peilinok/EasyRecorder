// @flow
import React, { Component } from 'react';
import { Button } from 'antd';

import './style.scss';

type OP = 'start' | 'stop' | 'pause' | 'resume';

type Props = {
  isLoading: boolean,
  isRecording: boolean,
  isPaused: boolean,
  onRecordClick: OP => void
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
              onClick={() => onRecordClick('stop')}
            >
              Stop Recording
            </Button>
            {isPaused ? (
              <Button
                loading={isLoading}
                type="primary"
                icon="play-circle"
                onClick={() => onRecordClick('resume')}
              >
                Resume
              </Button>
            ) : (
              <Button
                loading={isLoading}
                type="primary"
                icon="pause-circle"
                onClick={() => onRecordClick('pause')}
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
            onClick={() => onRecordClick('start')}
          >
            Start Recording
          </Button>
        )}
      </div>
    );
  }
}
