const { ipcRenderer } = require('electron');

function showCoords(e: MouseEvent) {
    const x: number = e.clientX;
    const y: number = e.clientY;
    const ul: HTMLElement = document.getElementById('CoordsList');
    const coords: string = `<li>{ X: ${x}, Y: ${y} }</li>`
    return ul.insertAdjacentHTML('beforeend', coords);
}

function logCoords(e: MouseEvent) {
    const x: number = e.clientX;
    const y: number = e.clientY;
    const log: string = `[${new Date()}] - { X: ${x}, Y: ${y}}`
    return ipcRenderer.send('mousemove', log);
};