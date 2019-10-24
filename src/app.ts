import { app, BrowserWindow, ipcMain } from 'electron';
import Main from './Main';

Main.main(app, BrowserWindow);

ipcMain.on('mousemove', (event, arg) => {
  console.log(arg);
});