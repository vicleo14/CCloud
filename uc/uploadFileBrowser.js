"use strict";
exports.__esModule = true;
var AES256_1 = require("../src/app/classes/crypto/AES256");
var RandomGenerator_1 = require("../src/app/classes/crypto/RandomGenerator");
var CryptoConstants_1 = require("../src/app/classes/utils/CryptoConstants");
var ExtensionConstants_1 = require("../src/app/classes/utils/ExtensionConstants");
var SHA256_1 = require("../src/app/classes/crypto/SHA256");
var HMac_1 = require("../src/app/classes/crypto/HMac");
var FSDAOFileData_1 = require("../src/app/classes/dataAccess/dao/FSDAOFileData");
var name1 = "cipheredData" + ExtensionConstants_1.ExtensionConstants.GENERIC_EXTENSION;
var name2 = "key" + ExtensionConstants_1.ExtensionConstants.CIPHERKEYD_EXTENSION;
var name3 = "mac" + ExtensionConstants_1.ExtensionConstants.MACKEYD_EXTENSION;
var pathP = "../";

function uploadFile(file) {
    var cipher = new AES256_1.AES256();
    var generator = new RandomGenerator_1.RandomGenerator();
    var mac = new HMac_1.HMac();
    var hash = new SHA256_1.SHA256();
    var fs = new FSDAOFileData_1.FSDAOFileData();
    var reader = new FileReader();
    var fileS = file[0];
    reader.onload = function () {
        /* GENERAMOS VALORES ALEATORIOS */
        var keyC = generator.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
        var keyM = generator.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
        /* LEEMOS ARCHIVO */
        //var data=fs.readFile(pathP,namep);
        //console.log(data);
        console.log("key1", keyC);
        /* CIFRAMOS  */
        var cipheredData = cipher.cipherFile(fileS, keyC);
        //console.log(cipheredData);
        /* CALCULAMOS MAC */
        var mres = mac.calculateMac(cipheredData.toString(), keyM);
        console.log("MAC:", mres);
        /* GENERAMOS ARCHIVOS DE LLAVES Y DOC CIFRADO */
        fs.createFile("./", name1, cipheredData);
        fs.createFile("./", name2, keyC);
        fs.createFile("./", name3, keyM);
        console.log(reader.result);
    };
    reader.readAsArrayBuffer(fileS);
}

module.exports=uploadFile;

