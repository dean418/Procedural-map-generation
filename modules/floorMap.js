class Room {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.neighbors = new Array();
    }

    getNextCoords() {
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
            let nextRoom = room.getNextCoords();

            //co-ords of next room
            nextX = nextRoom.x;
            nextY = nextRoom.y;

            // same co-ords generated try again
            if (this.map.has(`${nextX}|${nextY}`)) {
                continue;
            }

            // if room causes another room to have 4 neighbors, try again
            for (const [key, value] of this.map.entries()) {
                let newNeighbors = this.getNeighbors(room.x, room.y);

                for (const newNeighbor of newNeighbors) {
                    // each room can't have more than 3 neighbors
                    if (newNeighbor.neighbors.length == 3) {
                        //next generated room will always be on a diagonal to another room
                        let diags = this.getDiags(room.x,room.y);
                        let next = diags.getNextCoords();

                        // use closest room to try again
                        nextX = next.x;
                        nextY = next.y;

                        continue loop;
                    }
                }
            }

            this.storeRoom(room);

            this.updateNeighbors();

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

    updateNeighbors() {
        for (const [key, value] of this.map.entries()) {
            value.neighbors = this.getNeighbors(value.x, value.y);
        }
    }

    storeRoom(room) {
        this.map.set(`${room.x}|${room.y}`, room);
    }

    getNeighbors(x, y) {
        let neighbors = new Array();

        if (this.map.has(`${x}|${y + 1}`)) { // up
            neighbors.push(this.map.get(`${x}|${y + 1}`));
        }
        if (this.map.has(`${x}|${y - 1}`)) { // down
            neighbors.push(this.map.get(`${x}|${y - 1}`));
        }
        if (this.map.has(`${x-1}|${y}`)) { // left
            neighbors.push(this.map.get(`${x - 1}|${y}`));
        }
        if (this.map.has(`${x+1}|${y}`)) { // right
            neighbors.push(this.map.get(`${x + 1}|${y}`));
        }

        return neighbors;
    }

    getDiags(x, y) {
        if (this.map.has(`${x-1}|${y+1}`)) { // top left
            return this.map.get(`${x-1}|${y+1}`);
        }
        if (this.map.has(`${x+1}|${y+1}`)) { // top right
            return this.map.get(`${x+1}|${y+1}`);
        }
        if (this.map.has(`${x-1}|${y-1}`)) { // bottom left
            return this.map.get(`${x-1}|${y-1}`);
        }
        if (this.map.has(`${x+1}|${y-1}`)) { // bottom right
            return this.map.get(`${x+1}|${y-1}`);
        }
    }
}

export {FloorMap}