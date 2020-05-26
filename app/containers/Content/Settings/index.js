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
  output: string,
  isMicEnabled: boolean,
  isSpeakerEnabled: boolean
};

class SettingLayout extends Component<Props, State> {
  props: Props;

  constructor(props: Props) {
    super(props);

    const { mics, speakers } = recorder.getDevices();
    const mic = storage.getMic();
    const speaker = storage.getSpeaker();

    this.state = {
      mics: recorder.getDevices().mics,
      speakers: recorder.getDevices().speakers,
      currentMic: helper.getDefaultSelectedDevice(mics, mic),
      currentSpeaker: helper.getDefaultSelectedDevice(speakers, speaker),
      fps: storage.getFps(),
      quality: storage.getQuality(),
      output: storage.getOutputDir(),
      isMicEnabled: storage.isMicEnabled(),
      isSpeakerEnabled: storage.isSpeakerEnabled()
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    log.info('on setting form submit:', values);

    const {
      mic,
      speaker,
      fps,
      quality,
      output,
      isMicEnabled,
      isSpeakerEnabled
    } = values;
    this.setState(
      {
        currentMic: mic,
        currentSpeaker: speaker,
        fps,
        quality,
        isMicEnabled,
        isSpeakerEnabled,
        output
      },
      () => {
        storage.setMic(mic.id);
        storage.setSpeaker(speaker.id);
        storage.setFps(fps);
        storage.setQuality(quality);
        storage.setOutputDir(output);
        storage.enableMic(isMicEnabled);
        storage.enableSpeaker(isSpeakerEnabled);
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
      output,
      isMicEnabled,
      isSpeakerEnabled
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
          isMicEnabled={isMicEnabled}
          isSpeakerEnabled={isSpeakerEnabled}
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
