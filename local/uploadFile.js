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
var CryptoConstants_1 = require("../src/app/classes/utils/CryptoConstants");
var ExtensionConstants_1 = require("../src/app/classes/utils/ExtensionConstants");
var KeyConstants_1 = require("../src/app/classes/utils/KeyConstants");
var SHA256_1 = require("../src/app/classes/crypto/SHA256");
var HMac_1 = require("../src/app/classes/crypto/HMac");
var FSDAOFileData_1 = require("../src/app/classes/dataAccess/dao/FSDAOFileData");
var RSA_1 = require("../src/app/classes/crypto/RSA");
var MDBDAOFileInfo_1 = require("../src/app/classes/dataAccess/dao/MDBDAOFileInfo");
var MDBDAOKey_1 = require("../src/app/classes/dataAccess/dao/MDBDAOKey");
var DTOKey_1 = require("../src/app/classes/dataAccess/dto/DTOKey");
var DTOFileInfo_1 = require("../src/app/classes/dataAccess/dto/DTOFileInfo");
var dateFormat = require("dateformat");
var name1 = "cipheredData" + ExtensionConstants_1.ExtensionConstants.GENERIC_EXTENSION;
var name2 = "key" + ExtensionConstants_1.ExtensionConstants.CIPHERKEYC_EXTENSION;
var name3 = "mac" + ExtensionConstants_1.ExtensionConstants.MACKEYC_EXTENSION;
var namep = "pruebaIMG.png";
var pathP = "./";
var pathOut = "../storage/";
var filestr = require('fs');
function uploadFile( /*file*/) {
    var cipher = new AES256_1.AES256();
    var generator = new RandomGenerator_1.RandomGenerator();
    var mac = new HMac_1.HMac();
    var hash = new SHA256_1.SHA256();
    var fs = new FSDAOFileData_1.FSDAOFileData();
    var rsa = new RSA_1.RSA();
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
    //Se obtienen las llaves RSA anteriormente creadas
    var pubKey = filestr.readFileSync("./publicKey.txt");
    //Se cifran con la llave pública la llave de la mac y la llave del archivo
    var cipheredKeyM = rsa.publicEncryption(pubKey.toString(), Buffer.from(keyM));
    var cipheredKeyC = rsa.publicEncryption(pubKey.toString(), Buffer.from(keyC));
    console.log(cipheredKeyM);
    console.log(cipheredKeyC);
    /* GENERAMOS ARCHIVOS DE LLAVES Y DOC CIFRADO */
    fs.createFile(pathOut, name1, cipheredData);
    fs.createFile(pathOut, name2, cipheredKeyC);
    fs.createFile(pathOut, name3, cipheredKeyM);
}
//uploadFile();
function f1() {
    return __awaiter(this, void 0, void 0, function () {
        var cipher, generator, mac, hash, fs, rsa, nombreArchivo, split, user, nomArcG, clave, nomMAC, nomKey, keyC, keyM, hkey1, hkey2, data, cipheredData, mres, pubKey, cipheredKeyM, cipheredKeyC, name1, dtoFile, dtoK1, dtoK2, daoFile, daoKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cipher = new AES256_1.AES256();
                    generator = new RandomGenerator_1.RandomGenerator();
                    mac = new HMac_1.HMac();
                    hash = new SHA256_1.SHA256();
                    fs = new FSDAOFileData_1.FSDAOFileData();
                    rsa = new RSA_1.RSA();
                    nombreArchivo = "pruebaPDF.pdf";
                    split = nombreArchivo.split(".");
                    user = "memo1";
                    nomArcG = user + split[0] + dateFormat(new Date(), "yyyyMMddhhMMss");
                    clave = nomArcG;
                    nomMAC = nomArcG + ExtensionConstants_1.ExtensionConstants.MACKEYC_EXTENSION;
                    nomKey = nomArcG + ExtensionConstants_1.ExtensionConstants.CIPHERKEYC_EXTENSION;
                    keyC = generator.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
                    keyM = generator.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
                    hkey1 = hash.calculateHash(keyC);
                    hkey2 = hash.calculateHash(keyM);
                    data = fs.readFile(pathP, nombreArchivo);
                    cipheredData = cipher.cipherFile(data, keyC);
                    mres = mac.calculateMac(cipheredData.toString(), keyM);
                    pubKey = filestr.readFileSync("./publicKey.txt");
                    cipheredKeyM = rsa.publicEncryption(pubKey.toString(), Buffer.from(keyM));
                    cipheredKeyC = rsa.publicEncryption(pubKey.toString(), Buffer.from(keyC));
                    name1 = nomArcG + ExtensionConstants_1.ExtensionConstants.GENERIC_EXTENSION;
                    fs.createFile(pathOut, name1, cipheredData);
                    fs.createFile(pathOut, nomKey, cipheredKeyC);
                    fs.createFile(pathOut, nomMAC, cipheredKeyM);
                    dtoFile = new DTOFileInfo_1.DTOFileInfo();
                    dtoFile.setId(clave);
                    dtoFile.setDecipheredName(nombreArchivo);
                    dtoFile.setCipheredName(name1);
                    dtoFile.setMAC(mres);
                    dtoFile.setDate(new Date());
                    dtoFile.setSize(data.length);
                    dtoK1 = new DTOKey_1.DTOKey();
                    dtoK1.setIdFile(clave);
                    dtoK1.setIdType(KeyConstants_1.KeyConstants.KEY_CIPHER_DECIPHER);
                    dtoK1.setKeyFileName(nomKey);
                    dtoK1.setKeyHash(hkey1);
                    dtoK2 = new DTOKey_1.DTOKey();
                    dtoK2.setIdFile(clave);
                    dtoK2.setIdType(KeyConstants_1.KeyConstants.KEY_INTEGRITY);
                    dtoK2.setKeyFileName(nomMAC);
                    dtoK2.setKeyHash(hkey2);
                    daoFile = new MDBDAOFileInfo_1.MDBDAOFileInfo();
                    daoKey = new MDBDAOKey_1.MDBDAOKey();
                    return [4 /*yield*/, daoFile.createFile(user, dtoFile)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, daoKey.createKey(dtoK1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, daoKey.createKey(dtoK2)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function buscarPorUsuario(user) {
    return __awaiter(this, void 0, void 0, function () {
        var daoFiles, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    daoFiles = new MDBDAOFileInfo_1.MDBDAOFileInfo();
                    return [4 /*yield*/, daoFiles.findFilesByUser(user)];
                case 1:
                    results = _a.sent();
                    console.log("Results:", results);
                    return [2 /*return*/, results];
            }
        });
    });
}
buscarPorUsuario("vicleo16");
//f1();
