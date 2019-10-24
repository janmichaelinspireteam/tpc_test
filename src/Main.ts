// import { app, BrowserWindow, ipcMain } from 'electron';
// import * as path from 'path';
// let mainWindow: Electron.BrowserWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     height: 900,
//     width: 1440,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       nodeIntegration: true
//     },
//   });
//   mainWindow.loadFile(path.join(__dirname, '../mainWindow.html'));
//   mainWindow.webContents.openDevTools();
// }

// app.on('ready', createWindow);

// ipcMain.on('mousemove', (event, arg) => {
//   console.log(arg);
// });


import { BrowserWindow } from 'electron';
import * as path from 'path';

export default class Main {
	static mainWindow: Electron.BrowserWindow;
	static application: Electron.App;
	static BrowserWindow;
	private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

	private static onClose() {
		Main.mainWindow = null;
	}

	private static onReady() {
		Main.mainWindow = new BrowserWindow({
			height: 900,
			width: 1440,
			webPreferences: {
				preload: path.join(__dirname, 'preload.js'),
				nodeIntegration: true
			}
		});
		Main.mainWindow.loadFile(path.join(__dirname, '../mainWindow.html'));
		Main.mainWindow.webContents.openDevTools();
		Main.mainWindow.on('closed', Main.onClose);
		// Main.mainWindow.ipcMain.on('mousemove', (event, arg) => {
		// 	console.log(arg);
		// });
	}

	static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
		Main.BrowserWindow = browserWindow;
		Main.application = app;
		Main.application.on('window-all-closed', Main.onWindowAllClosed);
		Main.application.on('ready', Main.onReady);
	}
}