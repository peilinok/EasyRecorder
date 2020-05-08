// @flow
import React, { Component } from 'react';
import moment from 'moment';

import CustomButton from '../CustomButton';
import './style.scss';

type OP = 'start' | 'stop' | 'pause' | 'resume';

type Props = {
  isLoading: boolean,
  isRecording: boolean,
  isPaused: boolean,
  startTime: number,
  onRecordClick: OP => void,
  onFolderClick: () => void
};

const padZero = str => {
  return new RegExp(/^\d$/g).test(str) ? `0${str}` : str;
};

export default class RecordingBar extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      timer: -1,
      duration: '00:00:00'
    };
  }

  componentDidMount() {
    const timer = setInterval(() => {
      const { isRecording, isPaused } = this.props;
      if (isRecording === false || isPaused === true) return;

      this.setState({
        duration: this.getFormatedTimeSpan()
      });
    }, 1000);

    this.setState({ timer });
  }

  componentWillUnmount() {
    const { timer } = this.state;
    if (timer !== -1) clearInterval(timer);
  }

  getFormatedTimeSpan() {
    const { startTime } = this.props;
    if (startTime === 0) return '00:00:00';

    const duration = moment.duration(moment() - moment(startTime), 'ms');

    const hours = duration.get('hours');
    const minutes = duration.get('minutes');
    const seconds = duration.get('seconds');

    const ret = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

    return ret;
  }

  render() {
    const {
      isLoading,
      isRecording,
      isPaused,
      onRecordClick,
      onFolderClick
    } = this.props;

    const { duration } = this.state;

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

        {isRecording ? (
          <span className="recording-bar-duration">{duration}</span>
        ) : (
          <></>
        )}

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
