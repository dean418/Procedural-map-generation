class Room {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.neighbors = new Array();
    }

    genRoom() {
        let directions = [1, -1];

        // pick random direction for both axis
        let nextX = directions[Math.round(Math.random())];
        let nextY = directions[Math.round(Math.random())];

        // no diags, convert one to 0
        Math.round(Math.random()) ? nextX = 0 : nextY = 0;

        return {x:this.x + nextX, y:this.y + nextY}
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

        loop:
        while (true) {
            let room = new Room(nextX, nextY);
            let nextRoom = room.genRoom();

            //co-ords of next room
            nextX = nextRoom.x;
            nextY = nextRoom.y;

            // same co-ords generated try again
            if (this.map.has(`${nextX}|${nextY}`)) {
                continue;
            }

            // if room causes another room to have 4 neighbors, try again
            for (const [key, value] of this.map.entries()) {
                let potentialNeighbors = this.getNeighbors(room.x, room.y);

                for (const potentialNeighbor of potentialNeighbors) {
                    if (potentialNeighbor.neighbors.length == 3) {
                        // need to re-write nextX otherwise theres a chance of islands forming
                        let diags = this.getDiags(room.x,room.y);
                        let next = diags[0].genRoom();

                        nextX = next.x;
                        nextY = next.y;

                        continue loop;
                    }
                }
            }

            // store current room in map
            this.map.set(`${room.x}|${room.y}`, room);

            // update all room neighbors
            for (const [key, value] of this.map.entries()) {
                value.neighbors = this.getNeighbors(value.x, value.y);
            }

            // limit to x rooms
            if (this.map.size == this.numOfRooms) {
                break;
            }
        }
    }

    getRandomRoom() {
        let rooms = Array.from(this.map);
        return rooms[Math.floor(Math.random() * rooms.length)];
    }

    getNeighbors(x, y) {
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

    getDiags(x, y) {
        let diags = new Array();

        if (this.map.has(`${x+1}|${y+1}`)) {
            diags.push(this.map.get(`${x+1}|${y + 1}`));
        }
        if (this.map.has(`${x-1}|${y+1}`)) {
            diags.push(this.map.get(`${x-1}|${y+1}`));
        }

        if (this.map.has(`${x+1}|${y-1}`)) {
            diags.push(this.map.get(`${x+1}|${y-1}`));
        }

        if (this.map.has(`${x-1}|${y-1}`)) {
            diags.push(this.map.get(`${x-1}|${y-1}`));
        }

        return diags;
    }
}

export {FloorMap}