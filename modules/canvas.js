let canvas = document.getElementById('canvas');

class Box {
    constructor(width, height, room) {
        this.width = width;
        this.height = height;
        this.room = room;
    }
}

class FloorUI {
    constructor(floorMap) {
        this.floorMap = floorMap;
        this.floor = new Array();
        this.ctx = canvas.getContext('2d');

        this.canvasSetup();
    }

    canvasSetup() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0, 900, 600);

        let size = this.getHeightWidth();

        let width = canvas.width / size.xLen;
        let height = canvas.height / size.yLen;
        // console.log(width);
        // console.log(height);

        let xRange = this.getRange(size.coords.minX, size.coords.maxX);
        let yRange = this.getRange(size.coords.minY, size.coords.maxY);

        for (let i = 0; i < yRange.length; i++) { // col
            let row = new Array();
            for (let j = 0; j < xRange.length; j++) { // row
                let roomCoord = `${xRange[j]}|${yRange[i]}`;

                if (this.floorMap.has(roomCoord)) {
                    let box = new Box(width, height, this.floorMap.get(roomCoord));
                    row.push(box);
                } else {
                    row.push('');
                }
            }
            this.floor.push(row);
        }
        this.floor.reverse();
    }

    getRange(start, stop) {
        let a = [start];
        let b = start;

        while (b < stop) {
            a.push(b += 1);
        }

        return a;
    }

    getHeightWidth() {
        let coords = {
            maxX:0,
            minX:0,
            maxY:0,
            minY:0
        }

        for (const [key,value] of this.floorMap.entries()) {

            let x = parseInt(key.slice(0, key.indexOf('|')));
            let y = parseInt(key.slice(key.indexOf('|')+1));

            if (x > coords.maxX) coords.maxX = x;
            if (x < coords.minX) coords.minX = x;

            if (y > coords.maxY) coords.maxY = y;
            if (y < coords.minY) coords.minY = y;
        }

        return {
            xLen: Math.abs(coords.maxX - coords.minX)+1,
            yLen: Math.abs(coords.maxY - coords.minY)+1,
            coords
        }
    }

    fillCanvas() {
        let curX = 0;
        let curY = 0;
        let roomHeight=0;
        let roomWidth=0;

        for (const row of this.floor) {
            for (const room of row) {
                if (room) {
                    roomHeight = room.height;
                    roomWidth = room.width;
                    break;
                }
            }
        }
        for (const row of this.floor) {
            for (const room of row) {
                this.ctx.fillStyle = 'white';
                this.ctx.strokeStyle = 'black';

                if (room == '') {
                    this.ctx.fillStyle = 'black';
                    this.ctx.strokeStyle = 'black';
                }

                this.ctx.fillRect(curX+2, curY+2, roomWidth-2, roomHeight-2);
                this.ctx.fill();

                curX += parseInt(roomWidth);
            }
            curY += parseInt(roomHeight);
            curX = 0;
        }
    }
}

export {FloorUI}