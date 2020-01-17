// @flow
import React, { Component } from 'react';

import { Select } from 'antd';

import { DeviceItem } from '../../utils/types';

import './style.scss';

type Props = {
  options: Array<DeviceItem>,
  selected?: DeviceItem,
  disabled: boolean,
  onSelect: DeviceItem => void
};

export default class DeviceSelect extends Component<Props> {
  props: Props;

  static defaultProps = {
    selected: {}
  };

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(value, options) {
    const { onSelect } = this.props;

    if (onSelect) onSelect(options.props.data);
  }

  render() {
    const { options, selected, disabled } = this.props;

    return (
      <Select
        className="select-device"
        disabled={disabled}
        notFoundContent="no device found"
        onSelect={this.handleSelect}
        value={selected ? selected.id : ''}
      >
        {options.map(option => (
          <Select.Option key={option.id} value={option.id} data={option}>
            {option.name}
          </Select.Option>
        ))}
      </Select>
    );
  }
}
