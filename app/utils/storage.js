// @flow
import ElectronStore from 'electron-store';

const STORAGE_KEY_MIC = 'STORAGE_KEY_MIC';
const STORAGE_KEY_SPEAKER = 'STORAGE_KEY_SPEAKER';
const STORAGE_KEY_FPS = 'STORAGE_KEY_FPS';
const STORAGE_KEY_QUALITY = 'STORAGE_KEY_QUALITY';
const STORAGE_KEY_OUTPUT_DIR = 'STORAGE_KEY_OUTPUT_DIR';

const store = new ElectronStore();

const read = (key, defaultValue) => store.get(key, defaultValue);
const write = (key, value) => store.set(key, value);

const storage = {
  getMic: () => read(STORAGE_KEY_MIC, ''),
  setMic: (value: string) => write(STORAGE_KEY_MIC, value),

  getSpeaker: () => read(STORAGE_KEY_SPEAKER, ''),
  setSpeaker: (value: string) => write(STORAGE_KEY_SPEAKER, value),

  getFps: () => read(STORAGE_KEY_FPS, 20),
  setFps: (value: number) => write(STORAGE_KEY_FPS, value),

  getQuality: () => read(STORAGE_KEY_QUALITY, 60),
  setQuality: (value: number) => write(STORAGE_KEY_QUALITY, value),

  getOutputDir: () => read(STORAGE_KEY_OUTPUT_DIR, ''),
  setOutputDir: (value: string) => write(STORAGE_KEY_OUTPUT_DIR, value)
};

// store.openInEditor();

export default storage;
