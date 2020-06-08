// @flow
import moment from 'moment';
import path from 'path';

import { DeviceItem, EncoderItem } from './types';

moment.locale('zh-cn');

const helper = {
  getDefaultSelectedDevice: (devices: Array<DeviceItem>, id?: string) => {
    if (devices === undefined || devices.length === 0) return undefined;

    let device;
    for (let index = 0; index < devices.length; index += 1) {
      // no stored device id,return default one
      if ((id === undefined || id === '') && devices[index].isDefault === 1) {
        device = devices[index];
        break;
      }

      // find device by specified device id
      if (devices[index].id === id) {
        device = devices[index];
        break;
      }
    }

    // return found device or undefined
    return device;
  },
  getDefaultSelectedEncoder: (encoders: Array<EncoderItem>, id: number) => {
    if (encoders === undefined || encoders.length === 0) return undefined;

    for (let index = 0; index < encoders.length; index += 1) {
      if (encoders[index].id === id) return encoders[index];
    }

    if (encoders && encoders.length > 0) return encoders[0];

    return undefined;
  },
  generateVideoFileName(folder: string, ext: string) {
    return path.join(
      folder,
      // eslint-disable-next-line new-cap
      `${new moment().format('YYYY-MM-DD-hhmmss')}.${ext}`
    );
  }
};

export default helper;
