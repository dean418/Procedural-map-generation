import { FloorMap } from "./modules/floorMap.js";
import { FloorUI } from './modules/canvas.js';

let floor = new FloorMap(25);
floor.mapFloor();

let floorUI = new FloorUI(floor.map);
floorUI.fillCanvas();

for (const [key,value] of floor.map.entries()) {
    if (value.neighbors.length == 4) {
        console.log('fuck me 4');
    }
    if (value.neighbors.length == 0) {
        console.log('fuck me 0');
    }
}