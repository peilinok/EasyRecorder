/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { Form, Button, Input, Icon, Slider, Checkbox } from 'antd';

import { DeviceItem } from '../../../utils/types';

import DeviceSelect from '../../../components/DeviceSelect';

type State = {
  isMicEnabled: boolean,
  isSpeakerEnabled: boolean
};

type SettingFormData = {
  mic: DeviceItem,
  speaker: DeviceItem,
  fps: number,
  quality: number,
  isMicEnabled: boolean,
  isSpeakerEnabled: boolean,
  output: string
};

type Props = {
  disabled: boolean,
  mics: Array<DeviceItem>,
  speakers: Array<DeviceItem>,
  currentMic: DeviceItem,
  currentSpeaker: DeviceItem,
  fps: number,
  quality: number,
  output: string,
  isMicEnabled: boolean,
  isSpeakerEnabled: boolean,
  onSubmit: SettingFormData => void
};

class SettingForm extends Component<Props, State> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      isMicEnabled: props.isMicEnabled,
      isSpeakerEnabled: props.isSpeakerEnabled
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { form } = this.props;

    ipcRenderer.on('custom-open-folder-res', (event, arg) => {
      // eslint-disable-next-line react/prop-types
      form.setFieldsValue({ output: arg[0] });
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('custom-open-folder-res');
  }

  onSubmit(e) {
    // eslint-disable-next-line react/prop-types
    const { onSubmit, form } = this.props;
    const { isMicEnabled, isSpeakerEnabled } = this.state;
    e.preventDefault();

    // eslint-disable-next-line react/prop-types
    form.validateFields((err, values) => {
      if (!err) {
        if (onSubmit) onSubmit({ ...values, isMicEnabled, isSpeakerEnabled });
      }
    });
  }

  render() {
    const {
      disabled,
      mics,
      speakers,
      // eslint-disable-next-line react/prop-types
      form
    } = this.props;

    const { isMicEnabled, isSpeakerEnabled } = this.state;

    // eslint-disable-next-line react/prop-types
    const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

    return (
      <Form onSubmit={this.onSubmit} layout="horizontal">
        <Form.Item
          label={
            <Checkbox
              checked={isMicEnabled}
              onClick={() => {
                this.setState({ isMicEnabled: !isMicEnabled });
              }}
              disabled={disabled}
            >
              Microphones
            </Checkbox>
          }
        >
          {getFieldDecorator('mic', {
            rules: [
              {
                required: true && isMicEnabled,
                message: 'Must select a microphone'
              }
            ]
          })(
            <DeviceSelect
              options={mics}
              selected={getFieldValue('mic')}
              disabled={disabled || !isMicEnabled}
              onSelect={mic => setFieldsValue({ mic })}
            />
          )}
        </Form.Item>

        <Form.Item
          label={
            <Checkbox
              checked={isSpeakerEnabled}
              onClick={() =>
                this.setState({ isSpeakerEnabled: !isSpeakerEnabled })
              }
              disabled={disabled}
            >
              Speakers
            </Checkbox>
          }
        >
          {getFieldDecorator('speaker', {
            rules: [
              {
                required: true && isSpeakerEnabled,
                message: 'Must select a speaker'
              }
            ]
          })(
            <DeviceSelect
              options={speakers}
              selected={getFieldValue('speaker')}
              disabled={disabled || !isSpeakerEnabled}
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
                <Icon
                  type="folder-open"
                  title="Open"
                  onClick={() => {
                    if (disabled === true) return;
                    ipcRenderer.send('custom-open-folder-req');
                  }}
                />
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
