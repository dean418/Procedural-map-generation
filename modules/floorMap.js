let directions = [1, -1];
class Room {
    constructor() {
        this.x;
        this.y;
        this.neighbors = new Array();
    }
    genRoom(x, y) {
        this.x = x;
        this.y = y;

        // pick random direction for both axis
        let nextX = directions[Math.round(Math.random())];
        let nextY = directions[Math.round(Math.random())];

        // no diags, convert one to 0
        Math.round(Math.random()) ? nextX = 0 : nextY = 0;
        return {nextX, nextY}
    }
}

class FloorMap {
    constructor(rooms = 10) {
        this.numOfRooms = rooms;
        this.map = new Map();
    }

    mapFloor() {
        // co-ords of current room
        let nextX = 0;
        let nextY = 0;
        while (true) {
            let room = new Room();
            let nextRoom = room.genRoom(nextX, nextY);

            //co-ords of next room
            nextX = nextRoom.nextX + nextX;
            nextY = nextRoom.nextY + nextY;

            // same co-ords generated try again
            if (this.map.has(`${nextX}|${nextY}`)) {
                continue;
            }

            // if room causes another room to have 4 neighbors, try again
            for (const [key, value] of this.map.entries()) {
                let potentialNeighbors = this.assignNeighbors(room.x, room.y);

                for (const potentialNeighbor of potentialNeighbors) {
                    if (potentialNeighbor.neighbors.length == 3) {
                        continue;
                    }
                }
            }

            // store current room in map
            this.map.set(`${room.x}|${room.y}`, room);

            // update all room neighbors
            for (const [key, value] of this.map.entries()) {
                value.neighbors = this.assignNeighbors(value.x, value.y);
            }

            // for (const [key, value] of this.map.entries()) {
            //     // check  if room has 4 neighbors
            //     if (value.neighbors.length == 4) {
            //         //remove room from map
            //         for (const [key, value] of this.map.entries()) {
            //             // purge room from neighbors
            //             let newNeighbors = value.neighbors.filter(neighbor => (neighbor.x != room.x) && (neighbor.y != room.y));
            //             // this.map.set(key, {neighbors: newNeighbors})
            //         }
            //         this.map.delete(`${room.x}|${room.y}`);
            //     }
            // }

            // limit to x rooms
            if (this.map.size == this.numOfRooms) {
                break;
            }
        }
    }

    assignNeighbors(x, y) {
        let neighbors = new Array();

        if (this.map.has(`${x}|${y + 1}`)) {
            neighbors.push(this.map.get(`${x}|${y + 1}`));
        }
        if (this.map.has(`${x}|${y - 1}`)) {
            neighbors.push(this.map.get(`${x}|${y - 1}`));
        }
        if (this.map.has(`${x+1}|${y}`)) {
            neighbors.push(this.map.get(`${x + 1}|${y}`));
        }
        if (this.map.has(`${x-1}|${y}`)) {
            neighbors.push(this.map.get(`${x - 1}|${y}`));
        }

        return neighbors;
    }
}

export {FloorMap}