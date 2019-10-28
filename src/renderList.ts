import { ipcRenderer } from 'electron';

ipcRenderer.on('get-coordinates', (event, coordinates) => {
	setCoordsElement(coordinates);
});

const setCoordsElement = (mainData: { x: number, y: number }) => {
	const { x, y } = mainData;
	const ulElement: HTMLElement = document.getElementById('CoordsList');
	const listElement: HTMLElement = document.createElement('li');
	const coordsText: Text = document.createTextNode(`{ X: ${x}, Y: ${y} }`);
	listElement.appendChild(coordsText);
	return ulElement.appendChild(listElement);
};
