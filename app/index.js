import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import type { Store } from './reducers/types';
import { configuredStore, configuredHistory } from './store/configureStore';
import Routes from './routes';
import './utils';

import './app.global.css';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

type Props = {
  store: Store,
  history: {}
};

const Root = hot(({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
));

render(
  <AppContainer>
    <Root store={configuredStore} history={configuredHistory} />
  </AppContainer>,
  document.getElementById('root')
);
