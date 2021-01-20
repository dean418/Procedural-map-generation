let canvas = document.getElementById('canvas');

class Box {
    constructor(width, height) {
        this.width;
        this.height;
        this.room;
    }
}

class FloorUI {
    constructor(floorMap) {
        this.floorMap = floorMap;
        this.floor = new Array();
        this.ctx = canvas.getContext('2d');

        this.canvasSetup();
    }

    /*

    [
        ['lowX|hiY', 'x|y', 'x|y']
        ['x|y', 'x|y', 'x|y']
        ['x|y', 'x|y', 'x|y']
        ['x|y', 'x|y', 'hiX|lowY']
    ]

    */

    canvasSetup() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0, 900, 600);

        let size = this.getHeightWidth();

        let width = canvas.width / size.xLen;
        let height = canvas.height / size.yLen;

        // create box
        // add box to floor
        // assign room to box
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

            console.log('x: '+x,'y: '+y);

            if (x > coords.maxX) coords.maxX = x;
            if (x < coords.minX) coords.minX = x;

            if (y > coords.maxY) coords.maxY = y;
            if (y < coords.minY) coords.minY = y;
        }

        return {
            xLen: Math.abs(coords.maxX - coords.minX)+1,
            yLen: Math.abs(coords.maxY - coords.minY)+1
        }
    }
}

export {FloorUI}