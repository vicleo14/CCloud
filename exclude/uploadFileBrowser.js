"use strict";
exports.__esModule = true;
var AES256_1 = require("../src/app/classes/crypto/AES256");
var RandomGenerator_1 = require("../src/app/classes/crypto/RandomGenerator");
var CryptoConstants_1 = require("../src/app/classes/utils/CryptoConstants");
var SHA256_1 = require("../src/app/classes/crypto/SHA256");
var HMac_1 = require("../src/app/classes/crypto/HMac");
var FSDAOFileData_1 = require("../src/app/classes/dataAccess/dao/FSDAOFileData");
var RSA_1 = require("../src/app/classes/crypto/RSA");
function uploadFile(file) {
    {
        var publicKey = "-----BEGIN PUBLIC KEY-----" +
            "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1jDb8HxsMWhf0Gh3Yzh7" +
            "O+SHeV/WsiGyKhKhYd1O5DZUUqgWRaVG8v8DIAQLzNc7QJx2nPFv/tBZ9tFCwfAL" +
            "xoua+xvHCl5JONzKLzirTpu5mUOtNBai58P3cyUopOQIxzAVwHxboY4LLR3ZSg8t" +
            "T609pBckZiRhL4LM0Gv3vjuJdrJkFpiF4I4keOSbDFoosgtnJewbYXFBbPSizL4i" +
            "gFmtk6SCUOFR504DEQDvpnFXyIIjoKHkFh44M3YqNKZglUii12QKRv1K+7Dj3Zb4" +
            "M4XOjKz4fjUeJnGGC+VP+YbakBeH/2D5l2oz62bv52B6+HgyNlzTx6Oqk4t74jUm" +
            "k7Je2oIzoI9dQjNullnfVdLHs0Rp7GCYQclsKtHr2aiz74D/ZyHKgmstuVGv8xuP" +
            "ZNnyfiVBOMbG8yxefUnrHNkRnxfv6jOXUA/ah3b3vFgb4uBq1cBlNlnYWX1y4mf8" +
            "oRAKab1K9NBZJ3mVpzW/qJjGI8Zbl7s0Uqlmn8FxgW13LNs4rtQWz5D01uJ6AqUh" +
            "jcIfaOg/HwEViwcfkantsfYTZV70X0+G2qHTFeUJOiLh3+YTLUHC/y44t1UlY38c" +
            "BJGhwgfFm8lqcIC734stsrMEk2GhTO8tjBUnBbOPT5u7OOUIVwt8b7h3RvBph9qt" +
            "KVcoV6mWkkQRPoKW7uI3o78CAwEAAQ==" +
            "-----END PUBLIC KEY-----";
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
            var cipheredData = cipher.cipherFile(reader.result, keyC);
            /* CALCULAMOS TAG CON IMAC */
            var mres = mac.calculateMac(cipheredData.toString(), keyM);
            /* CALCULAMOS HASH DE LLAVES */
            var hashK = hash.calculateHash(keyC);
            var hashm = hash.calculateHash(keyM);
            /* CIFRAMOS LLAVES CON RSA */
            //Se cifran con la llave pública la llave de la mac y la llave del archivo
            var cipheredKeyM = rsa.publicEncryption(publicKey, Buffer.from(keyM, "base64"));
            var cipheredKeyC = rsa.publicEncryption(publicKey.toString(), Buffer.from(keyC, "base64"));
            console.log(keyC);
            console.log(keyM);
            console.log(mres);
            console.log(hashK);
            console.log(hashm);
            // console.log(cipheredData.toString());
            var ct = document.getElementById("ci");
            ct.value = cipheredData;
            var tagMacE = document.getElementById("macTagView");
            tagMacE.value = "Tag de MAC:" + tagMacE;
            console.log("RSAK1", cipheredKeyM.toString());
            console.log("RSAK2", cipheredKeyC.toString());
        };
        reader.readAsBinaryString(fileS);
    }
}
