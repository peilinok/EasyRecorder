// @flow
import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';

const selectedConfigureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

const { configureStore, history } = selectedConfigureStore;

const configuredStore = configureStore();

export { configuredStore, history as configuredHistory };
