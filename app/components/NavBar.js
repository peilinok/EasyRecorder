// @flow
import React, { Component } from 'react';

import { Menu } from 'antd';

type Props = {};

export default class NavBar extends Component<Props> {
  props: Props;

  render() {
    return (
      <Menu theme="light" mode="inline">
        <Menu.Item key="menu-record">录制</Menu.Item>
      </Menu>
    );
  }
}
