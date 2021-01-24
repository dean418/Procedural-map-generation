// Linear congruential generator
function* LCG(seed, mod=255, a=5, c=1) {
    while (true) {
        seed = (a * seed + c) % mod;
        yield seed;
    }
}

export {LCG}