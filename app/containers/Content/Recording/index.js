// @flow
import React, { Component } from 'react';

import RecordingBar from '../../../components/RecordingBar';
import RecordingPreview from '../../../components/RecordingPreview';

import './style.scss';

type Props = {};

export default class RecordingLayout extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="recording-layout">
        <RecordingBar
          isLoading={false}
          isPaused={false}
          isRecording={false}
          onRecordClick={() => {
            console.info('onClick');
          }}
        />
        <RecordingPreview />
      </div>
    );
  }
}
