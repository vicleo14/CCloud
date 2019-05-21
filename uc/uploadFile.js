"use strict";
exports.__esModule = true;
var AES256_1 = require("../src/app/classes/crypto/AES256");
var RandomGenerator_1 = require("../src/app/classes/crypto/RandomGenerator");
var CryptoConstants_1 = require("../src/app/classes/utils/CryptoConstants");
var ExtensionConstants_1 = require("../src/app/classes/utils/ExtensionConstants");
var SHA256_1 = require("../src/app/classes/crypto/SHA256");
var HMac_1 = require("../src/app/classes/crypto/HMac");
var FSDAOFileData_1 = require("../src/app/classes/dataAccess/dao/FSDAOFileData");
var RSA_1 = require("../src/app/classes/crypto/RSA");
var name1 = "cipheredData" + ExtensionConstants_1.ExtensionConstants.GENERIC_EXTENSION;
var name2 = "key" + ExtensionConstants_1.ExtensionConstants.CIPHERKEYD_EXTENSION;
var name3 = "mac" + ExtensionConstants_1.ExtensionConstants.MACKEYD_EXTENSION;
var namep = "ArquitecturaComputadoras.PDF";
var pathP = "./";
var filestr = require('fs');
function uploadFile( /*file*/) {
    var cipher = new AES256_1.AES256();
    var generator = new RandomGenerator_1.RandomGenerator();
    var mac = new HMac_1.HMac();
    var hash = new SHA256_1.SHA256();
    var fs = new FSDAOFileData_1.FSDAOFileData();
    var rsa = new RSA_1.RSA();
    //var reader=new FileReader();
    //reader.readAsArrayBuffer();
    /* GENERAMOS VALORES ALEATORIOS */
    var keyC = generator.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
    var keyM = generator.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
    /* LEEMOS ARCHIVO */
    var data = fs.readFile(pathP, namep);
    //console.log(data);
    //console.log("key1",keyC);
    /* CIFRAMOS  */
    var cipheredData = cipher.cipherFile(data, keyC);
    //console.log(cipheredData);
    /* CALCULAMOS MAC */
    var mres = mac.calculateMac(cipheredData.toString(), keyM);
    console.log("MAC:", mres);
    /* GENERAMOS ARCHIVOS DE LLAVES Y DOC CIFRADO */
    fs.createFile("./", name1, cipheredData);
    fs.createFile("./", name2, keyC);
    fs.createFile("./", name3, keyM);
    //Se obtienen las llaves RSA anteriormente creadas
    var pubKey = filestr.readFileSync("./publicKey.txt");
    var privKey = filestr.readFileSync("./privateKey.txt");
    //var pub = pubKey.slice(26, pubKey.length-25);
    //Se cifran con la llave pública la llave de la mac y la llave del archivo
    var cipheredKeyM = rsa.publicEncryption(pubKey.toString(), keyM);
    var cipheredKeyC = rsa.publicEncryption(pubKey.toString(), keyC);
    console.log(cipheredKeyM);
    console.log(cipheredKeyC);
    fs.createFile("./", "cipheredKeyM.txt", cipheredKeyM);
    fs.createFile("./", "cipheredKeyC.txt", cipheredKeyC);
}
uploadFile();
