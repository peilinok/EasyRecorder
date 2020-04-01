import React, { Component } from 'react';
import log from 'electron-log';
import { connect } from 'react-redux';

import { DeviceItem } from '../../../utils/types';
import recorder from '../../../utils/recorder';
import helper from '../../../utils/helper';
import storage from '../../../utils/storage';

import SettingForm from './setting-form';

import './style.scss';

type Props = {
  isRecording: boolean
};

type State = {
  mics: Array<DeviceItem>,
  speakers: Array<DeviceItem>,
  currentMic: DeviceItem,
  currentSpeaker: DeviceItem,
  fps: number,
  quality: number,
  output: string
};

class SettingLayout extends Component<Props, State> {
  props: Props;

  constructor(props: Props) {
    super(props);

    this.state = {
      mics: [],
      speakers: [],
      currentMic: undefined,
      currentSpeaker: undefined,
      fps: 20,
      quality: 60,
      output: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { mics, speakers } = recorder.getDevices();
    const mic = storage.getMic();
    const speaker = storage.getSpeaker();
    const fps = storage.getFps();
    const quality = storage.getQuality();
    const output = storage.getOutputDir();

    const currentMic = helper.getDefaultSelectedDevice(mics, mic);
    const currentSpeaker = helper.getDefaultSelectedDevice(speakers, speaker);

    this.setState({
      mics,
      speakers,
      currentMic,
      currentSpeaker,
      fps,
      quality,
      output
    });
  }

  onSubmit(values) {
    log.info('on setting form submit:', values);

    const { mic, speaker, fps, quality, output } = values;
    this.setState(
      {
        currentMic: mic,
        currentSpeaker: speaker,
        fps,
        quality,
        output
      },
      () => {
        storage.setMic(mic.id);
        storage.setSpeaker(speaker.id);
        storage.setFps(fps);
        storage.setQuality(quality);
        storage.setOutputDir(output);
      }
    );
  }

  render() {
    const {
      mics,
      speakers,
      currentMic,
      currentSpeaker,
      fps,
      quality,
      output
    } = this.state;

    const { isRecording } = this.props;

    return (
      <div className="setting-layout">
        <SettingForm
          disabled={isRecording}
          mics={mics}
          speakers={speakers}
          currentMic={currentMic}
          currentSpeaker={currentSpeaker}
          fps={fps}
          quality={quality}
          output={output}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isRecording: state.recorder.isRecording
  };
}

export default connect(mapStateToProps)(SettingLayout);
