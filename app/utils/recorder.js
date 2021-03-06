import log from 'electron-log';
import EasyRecorder from 'ffmpeg-recorder';

import storage from './storage';
import helper from './helper';

import {
  recorderStart,
  recorderStop,
  recorderPause,
  recorderResume
} from '../actions/recorder';

import { configuredStore as store } from '../store/configureStore';
import { msgSuccess, msgError } from './notification';

const ffRecorder = new EasyRecorder();

window.ffRecorder = ffRecorder;

const Recorder = {
  getDevices() {
    return {
      mics: ffRecorder.GetMics(),
      speakers: ffRecorder.GetSpeakers()
    };
  },
  getVideoEncoders() {
    return ffRecorder.GetVideoEncoders();
  },
  start() {
    const { isRecording } = store.getState().recorder;
    if (isRecording === true) {
      log.error('already recording,can not start again');
      return false;
    }

    const outputFileName = helper.generateVideoFileName(
      storage.getOutputDir(),
      'mkv'
    );

    log.info('start to record to file : ', outputFileName);

    const mic = storage.isMicEnabled() ? storage.getMic() : '';
    const speaker = storage.isSpeakerEnabled() ? storage.getSpeaker() : '';
    const vencoderId = storage.getVideoEncoder();

    const ret = ffRecorder.Init(
      storage.getQuality(),
      storage.getFps(),
      outputFileName,
      speaker,
      speaker,
      mic,
      mic,
      vencoderId
    );

    if (ret === 0) {
      ffRecorder.EnablePreview(true);
      ffRecorder.Start();
      store.dispatch(recorderStart(outputFileName));
      log.info('start to record succed');
      msgSuccess('start to record succed');
    } else {
      log.error('start to record failed:', ret);
      msgError('start to record failed');
    }

    return ret === 0;
  },
  stop() {
    const { isRecording } = store.getState().recorder;

    if (isRecording === true) {
      ffRecorder.Stop();
      ffRecorder.Release();
      store.dispatch(recorderStop());
      log.info('stop to record succed.');
      msgSuccess('stop succed');
    } else {
      log.error('already stopped,can not stop again');
      msgError('stop failed');
    }

    return true;
  },
  pause() {
    store.dispatch(recorderPause());
    ffRecorder.Pause();
  },
  resume() {
    store.dispatch(recorderResume());
    ffRecorder.Resume();
  },

  /**
   *
   * @param {(image:{size:number,width:number,height:number,type:number,data:Buffer})=>void} callback
   */
  onYuv(callback) {
    ffRecorder.SetPreviewYuvCallBack(callback);
  },

  /**
   *
   * @param {boolean} enable
   */
  enablePreview(enable) {
    ffRecorder.EnablePreview(enable);
  },

  /**
   *
   * @param {Element} element
   */
  bind(element) {
    ffRecorder.SetPreviewElement(element);
  },

  /**
   *
   */
  unBind() {
    ffRecorder.UnSetPreviewElement();
  }
};

export default Recorder;
