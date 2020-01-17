import log from 'electron-log';

const initLogTransports = () => {
  log.transports.console = message => {
    const date = new Date();
    switch (message.level) {
      case 'debug':
        console.debug(date.toLocaleTimeString(), ...message.data);
        break;
      case 'info':
        console.info(date.toLocaleTimeString(), ...message.data);
        break;
      case 'error':
        console.error(date.toLocaleTimeString(), ...message.data);
        break;
      case 'warn':
        console.warn(date.toLocaleTimeString(), ...message.data);
        break;
      default:
        console.log(date.toLocaleTimeString(), ...message.data);
        break;
    }
  };
};

const init = () => {
  initLogTransports();
};

init();
