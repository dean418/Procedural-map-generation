class Mersenne {
    constructor(seed) {
        this.N = 624;
        this.M = 397;
        this.MATRIX_A = 0x9908b0df;   /* constant vector a */
        this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
        this.LOWER_MASK = 0x7fffffff; /* least significant r bits */
        this.mt = new Array(this.N);
        this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

        this.init(seed)
    }

    init(seed) {
        this.mt[0] = seed >>> 0;

        for (this.mti=1; this.mti<this.N; this.mti++) {
            let s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
            this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + this.mti;
            this.mt[this.mti] >>>= 0;
        }
    }
}

function* getRandNum(seed=1) {
    let mersenne = new Mersenne(seed);
    let counter = 1;
    console.log(mersenne.mt);

    while (true) {
        yield mersenne.mt[counter];
        counter++;
    }
}

export {getRandNum}