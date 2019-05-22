"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var AES256_1 = require("../src/app/classes/crypto/AES256");
var RandomGenerator_1 = require("../src/app/classes/crypto/RandomGenerator");
var SHA256_1 = require("../src/app/classes/crypto/SHA256");
var HMac_1 = require("../src/app/classes/crypto/HMac");
var FSDAOFileData_1 = require("../src/app/classes/dataAccess/dao/FSDAOFileData");
var RSA_1 = require("../src/app/classes/crypto/RSA");
var MDBDAOFileInfo_1 = require("../src/app/classes/dataAccess/dao/MDBDAOFileInfo");
var MDBDAOKey_1 = require("../src/app/classes/dataAccess/dao/MDBDAOKey");
var name1 = "c.gnf"; //"cipheredData"+ExtensionConstants.GENERIC_EXTENSION;
var name2 = "key.vmf"; //"key"+ExtensionConstants.CIPHERKEYD_EXTENSION;
var name3 = "mac.drc"; //"mac"+ExtensionConstants.MACKEYD_EXTENSION;
var namep = "pruebaIMG.png";
var pathP = "../storage/";
var c1c = "key.cdcr";
var c2c = "mac.cvmf";
var arcC = "cipheredData.gnf";
var filestr = require('fs');
function decipherFile(idFile) {
    return __awaiter(this, void 0, void 0, function () {
        var path, cipher, generator, mac, hash, fs, rsa, pubKey, privKey, daoFile, daoKey, infoFile, keys, nameFileC, nameFileD, macArc, nameKeyM, nameKeyC, hashKeyM, hashKeyC, cipheredAESkey, cipheredMACkey, cipheredMessage, decipheredKeyC, decipheresKeyM, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = "../storage/";
                    cipher = new AES256_1.AES256();
                    generator = new RandomGenerator_1.RandomGenerator();
                    mac = new HMac_1.HMac();
                    hash = new SHA256_1.SHA256();
                    fs = new FSDAOFileData_1.FSDAOFileData();
                    rsa = new RSA_1.RSA();
                    pubKey = filestr.readFileSync("../local/publicKey.txt").toString();
                    privKey = filestr.readFileSync("../local/privateKey.txt").toString();
                    daoFile = new MDBDAOFileInfo_1.MDBDAOFileInfo();
                    daoKey = new MDBDAOKey_1.MDBDAOKey();
                    return [4 /*yield*/, daoFile.findFileById(idFile)];
                case 1:
                    infoFile = _a.sent();
                    return [4 /*yield*/, daoKey.findKeysByFileId(idFile)];
                case 2:
                    keys = _a.sent();
                    nameFileC = infoFile[0].getCipheredName();
                    nameFileD = infoFile[0].getDecipheredName();
                    macArc = infoFile[0].getMAC();
                    nameKeyM = keys[1].getKeyFileName();
                    nameKeyC = keys[0].getKeyFileName();
                    hashKeyM = keys[1].getKeyHash();
                    hashKeyC = keys[0].getKeyHash();
                    cipheredAESkey = fs.readFile(path, nameKeyC);
                    cipheredMACkey = fs.readFile(path, nameKeyM);
                    cipheredMessage = fs.readFile(path, nameFileC);
                    decipheredKeyC = rsa.privateDecryption(privKey, cipheredAESkey, 'rocanroll');
                    decipheresKeyM = rsa.privateDecryption(privKey, cipheredMACkey, 'rocanroll');
                    /* VERIFICAMOS HASH DE LLAVES */
                    if (hash.compareHash(decipheresKeyM.toString(), hashKeyM) && hash.compareHash(decipheredKeyC.toString(), hashKeyC)) {
                        console.log("Key hash verified");
                        /* VERIFICAMOS MAC DEL ARCHIVO */
                        console.log(mac.calculateMac(cipheredMessage.toString(), decipheresKeyM.toString()));
                        if (mac.verifyMac(cipheredMessage.toString(), decipheresKeyM.toString(), macArc)) {
                            console.log("Integrity verified");
                            result = cipher.decipherFile(cipheredMessage, decipheredKeyC.toString());
                            fs.createFile("./", nameFileD, result);
                            console.log("creado ", nameFileD);
                        }
                        else {
                            console.log("Something is bad");
                        }
                        /*console.log(cipheredAESkey);*/
                    }
                    else {
                        console.log("Something is bad");
                    }
                    /* VERIFICAMOS MAC DEL ARCHIVO */
                    /*if(mac.verifyMac(cipheredMessage.toString(),decipheresKeyM.toString(),macArc))
                    {
                        console.log("Integrity verified")
                    }else{
                        console.log("Something is bad")
                    }
                     /*console.log(cipheredAESkey);*/
                    console.log(macArc);
                    return [2 /*return*/];
            }
        });
    });
}
decipherFile("vicleo16pruebaIMG20195321075317");
