// @flow
import React, { Component } from 'react';
import log from 'electron-log';

import recorder from '../../../utils/recorder';
import { DeviceItem } from '../../../utils/types';

import SettingForm from './setting-form';

import './style.scss';

type Props = {};

type State = {
  mics: Array<DeviceItem>,
  speakers: Array<DeviceItem>,
  currentMic: DeviceItem,
  currentSpeaker: DeviceItem,
  fps: number,
  quality: number,
  output: string
};

export default class SettingLayout extends Component<Props, State> {
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
      output: 'd:\\'
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { mics, speakers } = recorder.getDevices();
    this.setState({
      mics,
      speakers,
      currentMic: mics.length ? mics[0] : undefined,
      currentSpeaker: speakers.length ? speakers[0] : undefined,
      fps: 20,
      quality: 60,
      output: 'd:\\'
    });
  }

  onSubmit(values) {
    log.info('on setting form submit:', values);

    const { mic, speaker, fps, quality, output } = values;
    this.setState({
      currentMic: mic,
      currentSpeaker: speaker,
      fps,
      quality,
      output
    });
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

    return (
      <div className="setting-layout">
        <SettingForm
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
