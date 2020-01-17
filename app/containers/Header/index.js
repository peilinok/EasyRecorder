// @flow
import React, { Component } from 'react';

import './style.scss';

type Props = {
  pathname: string
};

export default class HeaderLayout extends Component<Props> {
  props: Props;

  render() {
    const { pathname } = this.props;

    return (
      <div className="header-layout">
        <span>{pathname.toUpperCase()}</span>
      </div>
    );
  }
}
