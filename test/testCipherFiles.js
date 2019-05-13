"use strict";
//tsc test/testKeys.ts
//node test/testKeys.js 
exports.__esModule = true;
var AES256_1 = require("../src/app/classes/crypto/AES256");
var RandomGenerator_1 = require("../src/app/classes/crypto/RandomGenerator");
var CryptoConstants_1 = require("../src/app/classes/utils/CryptoConstants");
var crypto = require('crypto');
var fs = require('fs');
function main() {
    var keyGen = new RandomGenerator_1.RandomGenerator();
    var aes = new AES256_1.AES256();
    var key = keyGen.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
    //Original file reader
    var contenido = fs.readFileSync("Original/Mov_Pendulo_Simple.mov");
    console.log(contenido);
    //Encryption
    var cadena = aes.cipherFile(contenido, key);
    console.log(cadena);
    fs.appendFileSync('Encrypted/Mov_Pendulo_Simple.gnf', cadena);
    //Encrypted file reader
    var enc_content = fs.readFileSync("Encrypted/Mov_Pendulo_Simple.gnf");
    console.log(enc_content);
    //Decryption
    var cadena2 = aes.decipherFile(enc_content, key);
    console.log(cadena2);
    //console.log(aux);
    var writeStream = fs.createWriteStream("Decrypted/Mov_Pendulo_Simple.mov");
    writeStream.write(cadena2);
    writeStream.end();
}
main();
