import { FloorMap } from "./modules/floorMap.js";
import { FloorUI } from './modules/canvas.js';

let floor = new FloorMap();
floor.mapDungeon();

let floorUI = new FloorUI(floor.map);



// for (const [key, value] of dungeon.map.entries()) {
//     console.log('###########');
//     console.log('key ' + key);

//     for (const thing of value.neighbors) {
//         console.log('neighbor ' + thing.x + '|' + thing.y);
//     }
// }

