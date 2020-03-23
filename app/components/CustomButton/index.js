import React, { Component } from 'react';
import classNames from 'classnames';
import { Button, Icon } from 'antd';

import './style.scss';

type Props = {
  isIconButton: boolean,
  title: string,
  visible: boolean,
  loading: boolean,
  icon: string,
  type: string,
  style: object,
  className: string,
  onClick: func
};

export default class CustomButton extends Component<Props> {
  props: Props;

  render() {
    const {
      isIconButton,
      title,
      visible,
      icon,
      type,
      style,
      className,
      onClick,
      loading
    } = this.props;

    if (visible === false) return <></>;

    return isIconButton === true ? (
      <Icon
        className={classNames('icon-button', className)}
        style={{ ...style }}
        title={title}
        onClick={onClick}
        type={icon}
      />
    ) : (
      <Button
        className={classNames('normal-button', className)}
        style={{ ...style }}
        onClick={onClick}
        icon={icon}
        type={type}
        loading={loading}
      >
        {title}
      </Button>
    );
  }
}
