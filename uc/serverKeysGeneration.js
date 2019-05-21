"use strict";
exports.__esModule = true;
var RSAKeyGenerator_1 = require("../src/app/classes/crypto/RSAKeyGenerator");
var RSA_1 = require("../src/app/classes/crypto/RSA");
var fs = require('fs');
function main() {
    var keyGen = new RSAKeyGenerator_1.RSAKeyGenerator();
    var rsa = new RSA_1.RSA();
    var publicKey, privateKey;
    var keys;
    keys = keyGen.generateKeys('rocanroll');
    publicKey = keys[0];
    privateKey = keys[1];
    //Original file reader
    fs.appendFileSync('publicKey.txt', publicKey);
    fs.appendFileSync('privateKey.txt', privateKey);
}
main();
