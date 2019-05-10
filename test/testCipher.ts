//tsc test/testKeys.ts
//node test/testKeys.js 

import { AES256 } from "../src/app/classes/crypto/AES256";
import { IBlockCipher } from "../src/app/classes/crypto/IBlockCipher";
import { RandomGenerator } from "../src/app/classes/crypto/RandomGenerator";
import { IRandomGenerator } from "../src/app/classes/crypto/IRandomGenerator";
import {CryptoConstants} from "../src/app/classes/utils/CryptoConstants";
const crypto = require('crypto');

function main()
{
    
    var keyGen:IRandomGenerator=new RandomGenerator();
    var aes:IBlockCipher=new AES256();
    var key=keyGen.generateRandom(CryptoConstants.AES_KEYSIZE_BYTES);
    console.log("KEY LENGTH",key.length);
    console.log(key);
    console.log("Hola");
    var cadena=aes.cipher("Victor Leonel Morales Flores",key);
    console.log("Cifrado:",cadena);
    console.log("IV:",cadena.substr(cadena.length-CryptoConstants.AES_IVSIZE_BYTES));
    var cadena2=aes.decipher(cadena,key);
    console.log("Decifrado:",cadena2);  
}
main();