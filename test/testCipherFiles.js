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
    var contenido = fs.readFileSync("Original/key.vmf");
    console.log(contenido);
    //Encryption
    var cadena = aes.cipherFile(contenido, key);
    console.log(cadena);
    console.log("size encrypted:", cadena.length);
    fs.appendFileSync('Encrypted/key.gnf', cadena);
    //Encrypted file reader
    var enc_content = fs.readFileSync("Encrypted/key.gnf");
    console.log(enc_content);
    //Decryption
    var cadena2 = aes.decipherFile(enc_content, key);
    console.log(cadena2);
    console.log("size decrypted:", cadena2.length);
    //console.log(aux);
    var writeStream = fs.createWriteStream("Decrypted/key.mov");
    writeStream.write(cadena2);
    writeStream.end();
}
main();
