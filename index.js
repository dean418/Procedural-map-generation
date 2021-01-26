import { FloorMap } from "./modules/floorMap.js";
import { FloorUI } from './modules/canvas.js';

let floor = new FloorMap(25);
floor.mapFloor();

document.getElementById('seed').textContent = floor.seed;

let floorUI = new FloorUI(floor.map);
floorUI.fillCanvas();