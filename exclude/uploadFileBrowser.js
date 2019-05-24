"use strict";
exports.__esModule = true;
var AES256_1 = require("../src/app/classes/crypto/AES256");
var RandomGenerator_1 = require("../src/app/classes/crypto/RandomGenerator");
var CryptoConstants_1 = require("../src/app/classes/utils/CryptoConstants");
var SHA256_1 = require("../src/app/classes/crypto/SHA256");
var HMac_1 = require("../src/app/classes/crypto/HMac");
var FSDAOFileData_1 = require("../src/app/classes/dataAccess/dao/FSDAOFileData");
var RSA_1 = require("../src/app/classes/crypto/RSA");
window.uploadFile = function (file) {
    {
        var cipher = new AES256_1.AES256();
        var generator = new RandomGenerator_1.RandomGenerator();
        var mac = new HMac_1.HMac();
        var hash = new SHA256_1.SHA256();
        var fs = new FSDAOFileData_1.FSDAOFileData();
        var rsa = new RSA_1.RSA();
        var reader = new FileReader();
        var fileS = file[0];
        reader.onload = function () {
            /* GENERAMOS VALORES ALEATORIOS */
            var keyC = generator.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
            var keyM = generator.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
            /* CIFRAMOS CON AES */
            var cipheredData = cipher.cipher(reader.result, keyC);
            /* CALCULAMOS TAG CON IMAC */
            var mres = mac.calculateMac(cipheredData.toString(), keyM);
            /* CALCULAMOS HASH DE LLAVES */
            var hashK = hash.calculateHash(keyC);
            var hashm = hash.calculateHash(keyM);
            /* CIFRAMOS LLAVES CON RSA */
            //Se cifran con la llave pública la llave de la mac y la llave del archivo
            var cipheredKeyM = rsa.publicEncryption(pubKey, keyM);
            var cipheredKeyC = rsa.publicEncryption(pubKey.toString(), keyC);
            var tagMacE = document.getElementById("macTagView");
            tagMacE.innerHTML = "Tag de MAC:" + mres;
            window.infoContainer = {
                "name": file[0].name,
                "mac": mres,
                "hashK": hashK,
                "hashM": hashm,
                "AESkey": cipheredKeyC,
                "macKey": cipheredKeyM,
                "data": cipheredData,
                "nickname": "vicleo16",
                "size": cipheredData.length
            };
            console.log(">>>>>key1 deciphered:\n", keyC);
            console.log(">>>>>key2 deciphered:\n", keyM);
            console.log(">>>>>K1 ciphered:\n", cipheredKeyC);
            console.log(">>>>>K2 ciphered:\n", cipheredKeyM);
            console.log("File size:", cipheredData.length);
            console.log("Ciphered file:", cipheredData);
        };
        reader.readAsBinaryString(fileS);
    }
};
