let canvas = document.getElementById('canvas');

class Box {
    constructor(room) {
        this.room = room;
    }
}

class FloorUI {
    constructor(floorMap) {
        this.floorMap = floorMap;
        this.floor = new Array();
        this.ctx = canvas.getContext('2d');

        let range = this.canvasSetup();
        this.floorSetup(range.x, range.y);
    }

    canvasSetup() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0, 900, 600);

        let size = this.getHeightWidth();

        //rooms have a size of 50px
        canvas.width = size.xLen * 50;
        canvas.height = size.yLen * 50;

        let xRange = this.getRange(size.coords.minX, size.coords.maxX);
        let yRange = this.getRange(size.coords.minY, size.coords.maxY);

        return {x: xRange, y: yRange}
    }

    floorSetup(xRange, yRange) {
        for (const y of yRange) {
            let row = new Array();

            for (const x of xRange){
                let roomCoord = `${x}|${y}`;

                if (this.floorMap.has(roomCoord)) {
                    let box = new Box(this.floorMap.get(roomCoord));
                    row.push(box);
                } else {
                    //push an empty space to the floor
                    row.push('');
                }
            }
            this.floor.push(row);
        }
        //floor needs to be reversed to be in correct orientation
        this.floor.reverse();
    }

    fillCanvas() {
        let curX = 2;
        let curY = 2;
        let roomHeight=48;
        let roomWidth=48;

        for (const row of this.floor) {
            for (const room of row) {
                this.ctx.fillStyle = 'white';
                this.ctx.strokeStyle = 'black';

                if (room == '') {
                    this.ctx.fillStyle = 'black';
                    this.ctx.strokeStyle = 'black';
                }

                this.ctx.fillRect(curX, curY, roomWidth, roomHeight);
                this.ctx.fill();

                curX += parseInt(roomWidth)+2;
            }
            curY += parseInt(roomHeight)+2;
            curX = 2;
        }
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
}

export {FloorUI}