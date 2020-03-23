import { notification, message } from 'antd';

notification.config({
  duration: 3,
  placement: 'topLeft',
  top: 10
});

message.config({
  duration: 3,
  maxCount: 3,
  top: 10
});

export function notifyInfo(content) {
  notification.info({
    key: 'easy-recorder-notifiy-info',
    description: 'EasyRecorder',
    message: content
  });
}

export function notifyWarn(content) {
  notification.warn({
    key: 'easy-recorder-notifiy-warn',
    description: 'EasyRecorder',
    message: content
  });
}

export function notifySuccess(content) {
  notification.success({
    key: 'easy-recorder-notifiy-success',
    description: 'EasyRecorder',
    message: content
  });
}

export function notifyError(content) {
  notification.error({
    key: 'easy-recorder-notifiy-error',
    description: 'EasyRecorder',
    message: content
  });
}

export function msgInfo(content) {
  message.info(content);
}

export function msgWarn(content) {
  message.warn(content);
}

export function msgSuccess(content) {
  message.success(content);
}

export function msgError(content) {
  message.error(content);
}
