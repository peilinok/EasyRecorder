// @flow
import React, { Component } from 'react';

import './style.scss';

type Props = {};

export default class RecordingPreview extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="recording-preview">
        <h1>Preview</h1>
        <h2>Ops, unsupport now</h2>
      </div>
    );
  }
}
