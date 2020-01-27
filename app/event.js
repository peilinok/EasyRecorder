import { dialog, ipcMain } from 'electron';

ipcMain.on('custom-open-folder-req', (event, arg) => {
  dialog.showOpenDialog({
    ...arg,
    properties: ['openDirectory']
  });
});
