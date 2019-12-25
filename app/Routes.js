import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from './containers/HomePage';

export default () => (
  <Switch>
    <Route path="/" component={HomePage} />
  </Switch>
);
