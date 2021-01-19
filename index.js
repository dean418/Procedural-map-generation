import { FloorMap } from "./modules/floorMap.js";

let dungeon = new FloorMap();
dungeon.mapDungeon();

for (const [key, value] of dungeon.map.entries()) {
    console.log('###########');
    console.log('key ' + key);

    for (const thing of value.neighbors) {
        console.log('neighbor ' + thing.x + '|' + thing.y);
    }
}