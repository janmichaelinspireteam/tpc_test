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


	/* UNFINISHED CODE FOR THE OPTIMIZATION */
	
	// const coordsContainer = document.getElementById('CoordsContainer');
	// const itemsCount = coordsContainer.getElementsByTagName('li').length;
	// const rowHeight = 20;
	// const scrollTop = coordsContainer.scrollTop;
	// const nodePadding = 20;
	// const viewportHeight = 800;
	// const totalContentHeight = itemsCount * rowHeight;

	// let startNode = Math.floor(scrollTop / rowHeight) - nodePadding;
	// startNode = Math.max(0, startNode);
  
	// let visibleNodesCount = Math.ceil(viewportHeight / rowHeight) + 2 * nodePadding;
	// visibleNodesCount = Math.min(itemsCount - startNode, visibleNodesCount);
	// const offsetY = startNode * rowHeight;

	// coordsContainer.style.height = `${viewportHeight}px`;
	// coordsContainer.style.overflow = 'auto';

	// const contentWrapper = document.getElementById('ContentWrapper');
	// contentWrapper.style.overflow = 'hidden';
	// contentWrapper.style.height = `${totalContentHeight}px`;
	
	// const ulWrapper = document.getElementById('UlWrapper');
	// const listElement: HTMLElement = document.createElement('li');

	// ulWrapper.style.transform = `translateY(${offsetY}px)`;
	// const coordsText: Text = document.createTextNode(`{ X: ${x}, Y: ${y} }`);
	// listElement.append(coordsText);
	// return ulWrapper.appendChild(listElement);
};



