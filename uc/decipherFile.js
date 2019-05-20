"use strict";
exports.__esModule = true;
var AES256_1 = require("../src/app/classes/crypto/AES256");
var RandomGenerator_1 = require("../src/app/classes/crypto/RandomGenerator");
var SHA256_1 = require("../src/app/classes/crypto/SHA256");
var HMac_1 = require("../src/app/classes/crypto/HMac");
var FSDAOFileData_1 = require("../src/app/classes/dataAccess/dao/FSDAOFileData");
var name1 = "c.gnf"; //"cipheredData"+ExtensionConstants.GENERIC_EXTENSION;
var name2 = "key.vmf"; //"key"+ExtensionConstants.CIPHERKEYD_EXTENSION;
var name3 = "mac.drc"; //"mac"+ExtensionConstants.MACKEYD_EXTENSION;
var namep = "a.png";
var pathP = "../";
function enServidor() {
    console.log("ADVERTENCIA: LA MAC ESTA FIJA");
    var cipher = new AES256_1.AES256();
    var generator = new RandomGenerator_1.RandomGenerator();
    var mac = new HMac_1.HMac();
    var hash = new SHA256_1.SHA256();
    var fs = new FSDAOFileData_1.FSDAOFileData();
    /* LEEMOS LLAVE Y ARCHIVO CIFRADO */
    var key2 = fs.readFile("./", name2).toString();
    //var mac2=fs.readFile("./",name3).toString();
    var cd2 = fs.readFile("./", name1);
    var mres = "JvPOcXt3nE7TFRQ57OgJX1r2JlK6mhjNOYOHoRPYN0o=";
    //console.log("key2",key2);
    /* COMPROBAMOS MAC */
    /*if(mac.verifyMac(cd2.toString(),mac2,mres))
        console.log("MAC verificada");
    else
        console.log("ERROR EN MAC");
*/
    /* DECIFRAMOS ARCHIVO */
    console.log(cd2.length);
    var result = cipher.decipherFile(cd2, key2);
    //fs.createFile("./",namep,result);
}
enServidor();
