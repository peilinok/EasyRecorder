// @flow
import ffRecorder from 'ffmpeg-recorder';

const Recorder = {
  getDevices() {
    return {
      mics: ffRecorder.GetMics(),
      speakers: ffRecorder.GetSpeakers()
    };
  }
};

export default Recorder;
