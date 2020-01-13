// @flow
import React, { Component } from 'react';

import { Menu } from 'antd';

import './style.scss';

type Props = {};

export default class NavBar extends Component<Props> {
  props: Props;

  render() {
    return (
      <Menu theme="light" mode="inline">
        <Menu.Item key="menu-record">Record</Menu.Item>
        <Menu.Item key="menu-setting">Setting</Menu.Item>
      </Menu>
    );
  }
}
