import log from 'electron-log';
import { getDesktopFolder } from 'platform-folders';

import storage from './storage';
import recorder from './recorder';
import helper from './helper';

const initLog = () => {
  log.transports.console = message => {
    const date = new Date();
    switch (message.level) {
      case 'debug':
        console.debug(date.toLocaleTimeString(), ...message.data);
        break;
      case 'info':
        console.info(date.toLocaleTimeString(), ...message.data);
        break;
      case 'error':
        console.error(date.toLocaleTimeString(), ...message.data);
        break;
      case 'warn':
        console.warn(date.toLocaleTimeString(), ...message.data);
        break;
      default:
        console.log(date.toLocaleTimeString(), ...message.data);
        break;
    }
  };
};

const initSettings = () => {
  const { mics, speakers } = recorder.getDevices();
  const mic = storage.getMic();
  const speaker = storage.getSpeaker();
  const fps = storage.getFps();
  const quality = storage.getQuality();
  const output = storage.getOutputDir();

  const selectedMic = helper.getDefaultSelectedDevice(mics, mic);
  const selectedSpeaker = helper.getDefaultSelectedDevice(speakers, speaker);

  // no mic or speaker stored,store default one
  if (mic === undefined || mic === '') {
    storage.setMic(selectedMic.id);
  }

  if (speaker === undefined || speaker === '') {
    storage.setSpeaker(selectedSpeaker.id);
  }

  storage.setFps(fps);
  storage.setQuality(quality);
  storage.setOutputDir(output === '' ? getDesktopFolder() : output);
};

const init = () => {
  initLog();
  initSettings();
};

init();
