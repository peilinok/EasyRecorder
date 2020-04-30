// @flow
import React, { Component } from 'react';

import recorder from '../../utils/recorder';

import './style.scss';

type Props = {};

export default class RecordingPreview extends Component<Props> {
  props: Props;

  componentDidMount() {
    const dom = document.getElementById('recording-preview');
    recorder.enablePreview(true);
    recorder.bind(dom);
  }

  componentWillUnmount() {
    recorder.enablePreview(false);
    recorder.unBind();
  }

  render() {
    return <div className="recording-preview" id="recording-preview" />;
  }
}
