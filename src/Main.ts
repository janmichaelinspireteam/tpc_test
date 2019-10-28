import electron, { BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

export default class Main {
	public static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
		Main.BrowserWindow = browserWindow;
		Main.application = app;
		Main.application.on('window-all-closed', Main.onWindowAllClosed);
		Main.application.on('ready', Main.onReady);
	}

	private static mainWindow: Electron.BrowserWindow;
	private static application: Electron.App;
	private static BrowserWindow;
	private static oldCx: number;
	private static oldCy: number;

	private static onWindowAllClosed() {
		if (process.platform !== 'darwin') {
			Main.application.quit();
		}
	}

	private static onClose() {
		clearInterval();
		Main.mainWindow = null;
	}

	private static checkBoundary(x: number, y: number, width: number, height: number) {
		const MARGIN: number = 20;
		const didHitTop: boolean = y <= MARGIN;
		const didHitLeft: boolean = x <= MARGIN;
		const ditHitBottom: boolean = y >= (height - MARGIN);
		const didHitRight: boolean = x >= (width - MARGIN);
		const didNotHitBounds: boolean = !didHitTop && !didHitLeft && !ditHitBottom && !didHitRight;
		return didNotHitBounds;
	}

	private static watchCoordinates(x: number, y: number, width: number, height: number) {
		const coordinates = { coordX: 0, coordY: 0 };
		let newX: number = 0;
		let newY: number = 0;
		newX = x;
		newY = y;
		if (newX !== Main.oldCx && newY !== Main.oldCy) {
			coordinates.coordX = newX;
			coordinates.coordY = newY;
			const didNotHitBounds = Main.checkBoundary(coordinates.coordX, coordinates.coordY, width, height);
			if (didNotHitBounds) {
				Main.mainWindow.webContents.send('get-coordinates', { x: newX, y: newY });
			}
			Main.printLogs(coordinates.coordX, coordinates.coordY);
		}
		Main.oldCx = newX;
		Main.oldCy = newY;
	}

	private static printLogs(x: number, y: number) {
		return console.log(`[${new Date().toUTCString()}] - { X: ${x}, Y: ${y} }`);
	}

	private static onReady() {
		const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
		setInterval(() => {
			const { x, y } = electron.screen.getCursorScreenPoint();
			Main.watchCoordinates(x, y, width, height);
		}, 0);
		Main.mainWindow = new BrowserWindow({
			height,
			webPreferences: {
				nodeIntegration: true,
				preload: path.join(__dirname, 'preload.js'),
			},
			width,
		});
		Main.mainWindow.loadFile(path.join(__dirname, '../mainWindow.html'));
		Main.mainWindow.webContents.openDevTools();
		Main.mainWindow.on('closed', Main.onClose);
	}
}
