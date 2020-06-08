import React, { Component } from 'react';
import log from 'electron-log';
import { connect } from 'react-redux';

import { DeviceItem, EncoderItem } from '../../../utils/types';
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
  vEncoders: Array<EncoderItem>,
  currentMic: DeviceItem,
  currentSpeaker: DeviceItem,
  currentVEncoder: EncoderItem,
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

    this.state = {
      mics: [],
      speakers: [],
      vEncoders: [],
      currentMic: undefined,
      currentSpeaker: undefined,
      currentVEncoder: undefined,
      fps: storage.getFps(),
      quality: storage.getQuality(),
      output: storage.getOutputDir(),
      isMicEnabled: storage.isMicEnabled(),
      isSpeakerEnabled: storage.isSpeakerEnabled()
    };

    this.refreshSetting = this.refreshSetting.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { isRecording } = this.props;
    if (isRecording === true) return;

    this.refreshSetting();
  }

  refreshSetting() {
    const { mics, speakers } = recorder.getDevices();
    // will crashed when recording with hardware encoder
    const vEncoders = recorder.getVideoEncoders();
    const mic = storage.getMic();
    const speaker = storage.getSpeaker();
    const vencoderId = storage.getVideoEncoder();

    this.setState({
      mics,
      speakers,
      vEncoders,
      currentMic: helper.getDefaultSelectedDevice(mics, mic),
      currentSpeaker: helper.getDefaultSelectedDevice(speakers, speaker),
      currentVEncoder: helper.getDefaultSelectedEncoder(vEncoders, vencoderId),
      fps: storage.getFps(),
      quality: storage.getQuality(),
      output: storage.getOutputDir(),
      isMicEnabled: storage.isMicEnabled(),
      isSpeakerEnabled: storage.isSpeakerEnabled()
    });
  }

  onSubmit(values) {
    log.info('on setting form submit:', values);

    const {
      mic,
      speaker,
      vencoder,
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
        currentVEncoder: vencoder,
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
        storage.setVideoEncoder(vencoder.id);
      }
    );
  }

  render() {
    const {
      mics,
      speakers,
      vEncoders,
      currentMic,
      currentSpeaker,
      currentVEncoder,
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
          vEncoders={vEncoders}
          currentMic={currentMic}
          currentSpeaker={currentSpeaker}
          currentVEncoder={currentVEncoder}
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
