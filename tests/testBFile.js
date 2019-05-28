"use strict";
exports.__esModule = true;
var BFile_1 = require("../src/app/classes/bussines/BFile");
var BUser_1 = require("../src/app/classes/bussines/BUser");
var AES256_1 = require("../src/app/classes/crypto/AES256");
var RandomGenerator_1 = require("../src/app/classes/crypto/RandomGenerator");
var CryptoConstants_1 = require("../src/app/classes/utils/CryptoConstants");
var RSA_1 = require("../src/app/classes/crypto/RSA");
var HMac_1 = require("../src/app/classes/crypto/HMac");
var SHA256_1 = require("../src/app/classes/crypto/SHA256");
var fs = require("fs");
function main() {
    var random_gen = new RandomGenerator_1.RandomGenerator();
    var aes = new AES256_1.AES256();
    var mac = new HMac_1.HMac();
    var hash = new SHA256_1.SHA256();
    var rsa = new RSA_1.RSA();
    var bUser = new BUser_1.BUser();
    var bFile = new BFile_1.BFile();
    //Constants
    var nickname = "memo1";
    var fileName = "Ensayo. Un final Perfecto.pdf";
    //File's encryption
    var file = fs.readFileSync(fileName);
    var key = random_gen.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
    var cfile = aes.cipher(file.toString(), key);
    //Calculating MAC
    var keyMac = random_gen.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
    var mac_calc = mac.calculateMac(cfile, keyMac);
    //Obtaining public key
    var publicKey = fs.readFileSync("./../local/publicKey.txt").toString();
    //Encrypting keys
    var cipheredKeyFile = rsa.publicEncryption(publicKey, key);
    var cipheredKeyMac = rsa.publicEncryption(publicKey, keyMac);
    //Calculating Hashes
    var hashKeyFile = hash.calculateHash(cipheredKeyFile);
    var hashMac = hash.calculateHash(mac_calc);
    bFile.uploadFile(nickname, fileName, cfile, 80000, cipheredKeyMac, mac_calc, cipheredKeyFile, hashMac, hashKeyFile);
    bFile.shareFile(nickname, "victor1", fileName);
    bFile.downloadFile(nickname, fileName);
    //bFile.deleteFile(nickname, fileName);
}
main();
