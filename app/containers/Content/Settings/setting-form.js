// @flow
import React, { Component } from 'react';
import { Form, Button, Input, Icon, Slider } from 'antd';

import { DeviceItem } from '../../../utils/types';

import DeviceSelect from '../../../components/DeviceSelect';

type State = {
  disabled: boolean
};

type SettingFormData = {
  mic: DeviceItem,
  speaker: DeviceItem,
  fps: number,
  quality: number,
  output: string
};

type Props = {
  mics: Array<DeviceItem>,
  speakers: Array<DeviceItem>,
  // eslint-disable-next-line react/no-unused-prop-types
  currentMic: DeviceItem,
  // eslint-disable-next-line react/no-unused-prop-types
  currentSpeaker: DeviceItem,
  // eslint-disable-next-line react/no-unused-prop-types
  fps: number,
  // eslint-disable-next-line react/no-unused-prop-types
  quality: number,
  // eslint-disable-next-line react/no-unused-prop-types
  output: string,
  onSubmit: SettingFormData => void
};

class SettingForm extends Component<Props, State> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      disabled: false
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    // eslint-disable-next-line react/prop-types
    const { onSubmit, form } = this.props;
    e.preventDefault();

    // eslint-disable-next-line react/prop-types
    form.validateFields((err, values) => {
      if (!err) {
        if (onSubmit) onSubmit(values);
      }
    });
  }

  render() {
    const {
      mics,
      speakers,
      // eslint-disable-next-line react/prop-types
      form
    } = this.props;

    // eslint-disable-next-line react/prop-types
    const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

    const { disabled } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Item label="Microphones">
          {getFieldDecorator('mic', {
            rules: [
              {
                required: true,
                message: 'Must select a microphone'
              }
            ]
          })(
            <DeviceSelect
              options={mics}
              selected={getFieldValue('mic')}
              disabled={disabled}
              onSelect={mic => setFieldsValue({ mic })}
            />
          )}
        </Form.Item>
        <Form.Item label="Speakers">
          {getFieldDecorator('speaker', {
            rules: [
              {
                required: true,
                message: 'Must select a speaker'
              }
            ]
          })(
            <DeviceSelect
              options={speakers}
              selected={getFieldValue('speaker')}
              disabled={disabled}
              onSelect={speaker => setFieldsValue({ speaker })}
            />
          )}
        </Form.Item>

        <Form.Item label="FPS">
          {getFieldDecorator('fps', {
            rules: [
              {
                required: true
              }
            ]
          })(
            <Slider
              min={10}
              max={30}
              disabled={disabled}
              marks={{
                10: 'Normal',
                20: 'Smoonth',
                30: 'Best'
              }}
              step={5}
            />
          )}
        </Form.Item>

        <Form.Item label="Quality">
          {getFieldDecorator('quality', {
            rules: [
              {
                required: true
              }
            ]
          })(
            <Slider
              min={50}
              max={100}
              disabled={disabled}
              marks={{
                50: 'Normal',
                75: 'Better',
                100: 'Best'
              }}
            />
          )}
        </Form.Item>

        <Form.Item label="Output Directory">
          {getFieldDecorator('output', {
            rules: [
              {
                required: true,
                message: 'Must set a output directory'
              }
            ]
          })(
            <Input
              addonAfter={
                <Icon type="folder-open" title="Open" onClick={() => {}} />
              }
              readOnly
              disabled={disabled}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={disabled}>
            Apply
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  name: 'setting_form',
  mapPropsToFields(props) {
    return {
      mic: Form.createFormField({
        ...props.currentMic,
        value: props.currentMic ? props.currentMic : null
      }),
      speaker: Form.createFormField({
        ...props.currentSpeaker,
        value: props.currentSpeaker ? props.currentSpeaker : null
      }),
      fps: Form.createFormField({
        ...props.fps,
        value: props.fps ? props.fps : 20
      }),
      quality: Form.createFormField({
        ...props.quality,
        value: props.quality ? props.quality : 60
      }),
      output: Form.createFormField({
        ...props.output,
        value: props.output ? props.output : ''
      })
    };
  }
})(SettingForm);
