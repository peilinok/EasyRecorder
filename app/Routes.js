import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './containers';

export default () => (
  <Switch>
    <Route path="/" component={App} />
  </Switch>
);
