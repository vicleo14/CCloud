//tsc test/testKeys.ts
//node test/testKeys.js 

import { RandomGenerator } from "../src/app/classes/crypto/RandomGenerator";
import { IRandomGenerator } from "../src/app/classes/crypto/IRandomGenerator";
const crypto = require('crypto');
 function main()
{
    var rg:IRandomGenerator=new RandomGenerator();
    console.log("Llave1:", rg.generateRandom(15));

    console.log("Llave2:", rg.generateRandom(256));

    console.log("Llave3:", rg.generateRandom(315));

}

main();