import React from 'react';
import { Switch, Route } from 'react-router';
import AppLayout from './containers/AppLayout';

export default () => (
  <Switch>
    <Route path="/" component={AppLayout} />
  </Switch>
);
