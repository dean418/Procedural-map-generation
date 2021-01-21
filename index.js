import { FloorMap } from "./modules/floorMap.js";
import { FloorUI } from './modules/canvas.js';

let floor = new FloorMap(32);
floor.mapFloor();

let floorUI = new FloorUI(floor.map);
floorUI.fillCanvas();

// for (const [key,value] of floor.map.entries()) {
//     console.log(value.neighbors.length);
// }