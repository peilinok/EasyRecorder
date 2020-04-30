// @flow
import React, { Component } from 'react';
import YUVBuffer from 'yuv-buffer';
import YUVCanvas from 'yuv-canvas';

import EasyRecorder from '../../utils/recorder';

import './style.scss';

type Props = {};

export default class RecordingPreview extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.canvas = undefined;
    this.ctx = undefined;
    this.yuv = undefined;
    this.onYuv = this.onYuv.bind(this);
  }

  componentDidMount() {
    EasyRecorder.onYuv(this.onYuv);

    const dom = document.getElementById('preview-canvas');
    if (dom) {
      this.canvas = dom;
      this.ctx = this.canvas.getContext('2d');
      this.yuv = YUVCanvas.attach(this.canvas, { webGL: false });
    }
  }

  componentWillUnmount() {
    EasyRecorder.onYuv(() => {});

    this.yuv.clear();
    this.yuv = null;
  }

  onYuv(size, width, height, type, data) {
    if (this.yuv === undefined) return;

    console.info('onYuv', size, width, height);

    const format = YUVBuffer.format({
      width,
      height,
      chromaWidth: width / 2,
      chromaHeight: height / 2
    });

    const y = YUVBuffer.lumaPlane(format, data);
    const u = YUVBuffer.chromaPlane(format, data, undefined, width * height);
    const v = YUVBuffer.chromaPlane(
      format,
      data,
      undefined,
      (width * height * 5) / 4
    );
    const frame = YUVBuffer.frame(format, y, u, v);

    console.info(frame);

    this.yuv.drawFrame(frame);
  }

  render() {
    return (
      <div className="recording-preview">
        <canvas id="preview-canvas" />
      </div>
    );
  }
}
