import {getRandNum} from './mersenne.js';

class Room {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.neighbors = new Array();
    }

    getNextCoords(randNum) {
        let directions = [1, -1, 1, -1];
        let nextX = 0;
        let nextY = 0;

        randNum <= 2 ? nextX = directions[randNum] : nextY = directions[randNum];

        return {x:this.x + nextX, y:this.y + nextY}
    }
}

class FloorMap {
    constructor(rooms=10, seed=this.genSeed()) {
        this.numOfRooms = rooms;
        this.map = new Map();
        this.seed = seed;
        this.mersenne = getRandNum(seed);
        this.nextX = 0;
        this.nextY = 0;
    }

    mapFloor() {
        while (true) {
            let room = new Room(this.nextX, this.nextY);
            let nextRoom = room.getNextCoords(this.mersenne.next().value%4);

            //co-ords of next room
            this.nextX = nextRoom.x;
            this.nextY = nextRoom.y;

            // same co-ords generated try again
            if (this.map.has(`${this.nextX}|${this.nextY}`)) {
                continue;
            }

            if (this.checkNumOfNeighbors(room)) {
                continue;
            }

            this.storeRoom(room);
            this.updateNeighbors();

            // limit to x rooms
            if (this.map.size == this.numOfRooms) {
                break;
            }
        }
    }

    checkNumOfNeighbors(room) {
        // if room causes another room to have 4 neighbors, try again
        for (const [key, value] of this.map.entries()) {
            let newNeighbors = this.getNeighbors(room.x, room.y);

            for (const newNeighbor of newNeighbors) {
                // each room can't have more than 3 neighbors
                if (newNeighbor.neighbors.length == 3) {
                    //next generated room will always be on a diagonal to another room
                    let diags = this.getDiags(room.x,room.y);
                    let next = diags.getNextCoords(this.mersenne.next().value%4);

                    // use closest room to try again
                    this.nextX = next.x;
                    this.nextY = next.y;

                    return true;
                }
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

    genSeed() {
        return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }
}

export {FloorMap}