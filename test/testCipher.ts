//tsc test/testKeys.ts
//node test/testKeys.js 

import { AES256 } from "../src/app/classes/crypto/AES256";
import { IBlockCipher } from "../src/app/classes/crypto/IBlockCipher";
import { RandomGenerator } from "../src/app/classes/crypto/RandomGenerator";
import { IRandomGenerator } from "../src/app/classes/crypto/IRandomGenerator";
import {CryptoConstants} from "../src/app/classes/utils/CryptoConstants";
import { decode } from "punycode";
const crypto = require('crypto');
const fs = require('fs');

function main()
{
    
    var keyGen:IRandomGenerator=new RandomGenerator();
    var aes:IBlockCipher=new AES256();
    var key=keyGen.generateRandom(CryptoConstants.AES_KEYSIZE_BYTES);
    
    //Original file reader
    var contenido = fs.readFileSync("Original/ipn.PNG");
    console.log("Buffer original:",contenido);

    //Encryption
    var cadena = aes.cipherFile(contenido,key);
    console.log("Buffer generado:",cadena);
    console.log("size encrypted:",cadena.length);
    fs.appendFileSync('Encrypted/key.gnf', cadena);
    //_-----------------------IMPORTANTE
    var cad1=cadena.toString("base64");
    var buf64=Buffer.from(cad1,"base64");
    //--------------------
    

    //Encrypted file reader
    var enc_content = fs.readFileSync("Encrypted/key.gnf");
    console.log("Buffer leido:",enc_content);

    //Decryption
    var cadena2=aes.decipherFile(buf64,key);
    console.log("Buffer decifrado",cadena2);
    console.log("size decrypted:",cadena2.length);
    //console.log(aux);
    var writeStream = fs.createWriteStream("Decrypted/ipn.PNG");
    writeStream.write(cadena2);
    writeStream.end();
    
}

main();