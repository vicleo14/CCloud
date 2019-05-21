"use strict";
exports.__esModule = true;
var AES256_1 = require("../src/app/classes/crypto/AES256");
var RandomGenerator_1 = require("../src/app/classes/crypto/RandomGenerator");
var SHA256_1 = require("../src/app/classes/crypto/SHA256");
var HMac_1 = require("../src/app/classes/crypto/HMac");
var FSDAOFileData_1 = require("../src/app/classes/dataAccess/dao/FSDAOFileData");
var RSA_1 = require("../src/app/classes/crypto/RSA");
var name1 = "c.gnf"; //"cipheredData"+ExtensionConstants.GENERIC_EXTENSION;
var name2 = "key.vmf"; //"key"+ExtensionConstants.CIPHERKEYD_EXTENSION;
var name3 = "mac.drc"; //"mac"+ExtensionConstants.MACKEYD_EXTENSION;
var namep = "a.png";
var pathP = "../";
var filestr = require('fs');
function enServidor() {
    console.log("ADVERTENCIA: LA MAC ESTA FIJA");
    var cipher = new AES256_1.AES256();
    var generator = new RandomGenerator_1.RandomGenerator();
    var mac = new HMac_1.HMac();
    var hash = new SHA256_1.SHA256();
    var fs = new FSDAOFileData_1.FSDAOFileData();
    var rsa = new RSA_1.RSA();
    var pubKey = filestr.readFileSync("./publicKey.txt").toString();
    var privKey = filestr.readFileSync("./privateKey.txt").toString();
    console.log(pubKey.length);
    console.log(privKey.length);
    //console.log(privKey);
    //var priv = privKey.slice(37, privKey.length-35);
    //console.log(priv);
    /* LEEMOS LLAVE Y ARCHIVO CIFRADO */
    var key2 = filestr.readFileSync("./cipheredKeyM.txt");
    //var key2=fs.readFile("./",'cipheredKeyM');
    console.log(key2);
    console.log(key2.length);
    //var mac2=fs.readFile("./",name3).toString();
    var cd2 = fs.readFile("./", 'cipheredKeyC.txt');
    var mres = "SxULAFwTWVcksl0q/WOfzRU8+0hZuI4CwoXhLOZl5vo=";
    var decipheredKeyM = rsa.privateDecryption(privKey, key2, 'rocanroll');
    var decipheresKeyC = rsa.privateDecryption(privKey, cd2, 'rocanroll');
    console.log(decipheredKeyM);
    console.log(decipheresKeyC);
    //console.log("key2",key2);
    /* COMPROBAMOS MAC */
    //Read cipher data
    var message = filestr.readFileSync("./cipheredData.gnf").toString();
    if (mac.verifyMac(message, decipheredKeyM, mres))
        console.log("MAC verificada");
    else
        console.log("ERROR EN MAC");
    /* DECIFRAMOS ARCHIVO */
    //console.log(cd2.length);
    //var result=cipher.decipherFile(cd2,key2);
    //fs.createFile("./",namep,result);
}
enServidor();
