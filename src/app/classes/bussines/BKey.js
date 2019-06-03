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
var DTOFileInfo_1 = require("../dataAccess/dto/DTOFileInfo");
var MDBDAOFileInfo_1 = require("../dataAccess/dao/MDBDAOFileInfo");
var FSDAOFileData_1 = require("../dataAccess/dao/FSDAOFileData");
var DTOAction_1 = require("../dataAccess/dto/DTOAction");
var MDBDAOAction_1 = require("../dataAccess/dao/MDBDAOAction");
var DTOKey_1 = require("../dataAccess/dto/DTOKey");
var MDBDAOKey_1 = require("../dataAccess/dao/MDBDAOKey");
var RSA_1 = require("../crypto/RSA");
var AES256_1 = require("../crypto/AES256");
var RandomGenerator_1 = require("../crypto/RandomGenerator");
var CryptoConstants_1 = require("../utils/CryptoConstants");
var HMac_1 = require("../crypto/HMac");
var SHA256_1 = require("../crypto/SHA256");
var BFile_1 = require("../bussines/BFile");
var KeyConstants_1 = require("../utils/KeyConstants");
var Mail_1 = require("../mail/Mail");
var MDBDAOContact_1 = require("../dataAccess/dao/MDBDAOContact");
var ContactConstants_1 = require("../utils/ContactConstants");
var filestr = require('fs');
var path = "storage/";
var BKey = /** @class */ (function () {
    function BKey() {
        this.rsa = new RSA_1.RSA();
        this.hashO = new SHA256_1.SHA256();
        this.daoKey = new MDBDAOKey_1.MDBDAOKey();
        this.fsO = new FSDAOFileData_1.FSDAOFileData();
        this.pathP = "../../../../storage/";
    }
    BKey.prototype.decipherKey = function (key, hash) {
        return __awaiter(this, void 0, void 0, function () {
            var result, privKey, decipheredKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = undefined;
                        console.log("Hash recibido", hash);
                        privKey = filestr.readFileSync("./privateKey.txt").toString();
                        return [4 /*yield*/, this.rsa.privateDecryption(privKey, key, 'rocanroll')];
                    case 1:
                        decipheredKey = _a.sent();
                        console.log("Hash calculado", this.hashO.calculateHash(decipheredKey));
                        if (this.hashO.compareHash(decipheredKey.toString(), hash)) {
                            result = decipheredKey;
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    BKey.prototype.cipherKey = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var pubKey, cipheredKey;
            return __generator(this, function (_a) {
                pubKey = filestr.readFileSync("./publicKey.txt").toString();
                cipheredKey = this.rsa.publicEncryption(pubKey.toString(), key);
                return [2 /*return*/, cipheredKey.toString()];
            });
        });
    };
    BKey.prototype.storeKey = function (dtoKey, key) {
        return __awaiter(this, void 0, void 0, function () {
            var status, check, x_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = false;
                        if (!((check = this.decipherKey(key, dtoKey.getKeyHash())) != undefined)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.daoKey.createKey(dtoKey)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.fsO.createFile(this.pathP, dtoKey.getKeyFileName(), key)];
                    case 3:
                        _a.sent();
                        check = undefined;
                        status = true;
                        return [3 /*break*/, 5];
                    case 4:
                        x_1 = _a.sent();
                        status = false;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, status];
                }
            });
        });
    };
    //Falta el findKey
    BKey.prototype.keyLost = function (user, idFile) {
        return __awaiter(this, void 0, void 0, function () {
            var daoContact, mail, fs, rsa, generator, hmac, hash, dto_file_info, dto_action, dao_file_info, dao_file_data, dao_action, dao_key, resultKeys, resultFile, bfile, cipher, dataFile, key1, key2, decipheredK1, decipheredK2, _a, pubKey, decipheredFile, keyC, keyM, hkey1, hkey2, cipheredData, mres, cipheredKeyM, cipheredKeyC, dtoFile, dtoK1, dtoK2, daoFile, daoKey, dtoUsers, i, dtoUser, contacts, j, dtoContact;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("Comienza key lost");
                        daoContact = new MDBDAOContact_1.MDBDAOContact();
                        mail = new Mail_1.Mail();
                        fs = new FSDAOFileData_1.FSDAOFileData();
                        rsa = new RSA_1.RSA();
                        generator = new RandomGenerator_1.RandomGenerator();
                        hmac = new HMac_1.HMac();
                        hash = new SHA256_1.SHA256();
                        dto_file_info = new DTOFileInfo_1.DTOFileInfo();
                        dto_action = new DTOAction_1.DTOAction();
                        dao_file_info = new MDBDAOFileInfo_1.MDBDAOFileInfo();
                        dao_file_data = new FSDAOFileData_1.FSDAOFileData();
                        dao_action = new MDBDAOAction_1.MDBDAOAction();
                        dao_key = new MDBDAOKey_1.MDBDAOKey();
                        return [4 /*yield*/, dao_key.findKeysByFileId(idFile)];
                    case 1:
                        resultKeys = _b.sent();
                        return [4 /*yield*/, dao_file_info.findFileById(idFile)];
                    case 2:
                        resultFile = _b.sent();
                        bfile = new BFile_1.BFile();
                        cipher = new AES256_1.AES256();
                        return [4 /*yield*/, dao_file_data.readFile(path, resultFile[0].getCipheredName()).toString()];
                    case 3:
                        dataFile = _b.sent();
                        return [4 /*yield*/, dao_file_data.readFile(path, resultKeys[0].getKeyFileName()).toString()];
                    case 4:
                        key1 = _b.sent();
                        return [4 /*yield*/, dao_file_data.readFile(path, resultKeys[1].getKeyFileName()).toString()];
                    case 5:
                        key2 = _b.sent();
                        return [4 /*yield*/, this.decipherKey(key1, resultKeys[0].getKeyHash())];
                    case 6:
                        _a = (decipheredK1 = _b.sent()) != undefined;
                        if (!_a) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.decipherKey(key2, resultKeys[1].getKeyHash())];
                    case 7:
                        _a = (decipheredK2 = _b.sent()) != undefined;
                        _b.label = 8;
                    case 8:
                        if (!_a) return [3 /*break*/, 18];
                        pubKey = filestr.readFileSync("./publicKey.txt");
                        console.log("Keys OK");
                        return [4 /*yield*/, bfile.decipher(dataFile, decipheredK1, resultFile[0].getMAC(), decipheredK2)
                            //dao_file_data.createFile(path,resultFile[0].getDecipheredName(),decipheredFile);
                            /* GENERAMOS CLAVES */
                        ];
                    case 9:
                        decipheredFile = _b.sent();
                        keyC = generator.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
                        keyM = generator.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
                        hkey1 = hash.calculateHash(keyC);
                        hkey2 = hash.calculateHash(keyM);
                        return [4 /*yield*/, bfile.cipher(decipheredFile.toString("base64"), keyC)];
                    case 10:
                        cipheredData = _b.sent();
                        mres = hmac.calculateMac(cipheredData.toString(), keyM);
                        cipheredKeyM = rsa.publicEncryption(pubKey.toString(), keyM);
                        cipheredKeyC = rsa.publicEncryption(pubKey.toString(), keyC);
                        //Almacenamos en HDD
                        fs.createFile(path, resultFile[0].getCipheredName(), cipheredData.toString("base64"));
                        fs.createFile(path, resultKeys[0].getKeyFileName(), cipheredKeyC);
                        fs.createFile(path, resultKeys[1].getKeyFileName(), cipheredKeyM);
                        dtoFile = new DTOFileInfo_1.DTOFileInfo();
                        dtoFile.setId(idFile);
                        dtoFile.setDecipheredName(resultFile[0].getDecipheredName());
                        dtoFile.setCipheredName(resultFile[0].getCipheredName());
                        dtoFile.setMAC(mres);
                        dtoFile.setDate(new Date());
                        dtoFile.setSize(decipheredFile.length);
                        dtoK1 = new DTOKey_1.DTOKey();
                        dtoK1.setIdFile(idFile);
                        dtoK1.setIdType(KeyConstants_1.KeyConstants.KEY_CIPHER_DECIPHER);
                        dtoK1.setKeyFileName(resultKeys[0].getKeyFileName());
                        dtoK1.setKeyHash(hkey1);
                        dtoK2 = new DTOKey_1.DTOKey();
                        dtoK2.setIdFile(idFile);
                        dtoK2.setIdType(KeyConstants_1.KeyConstants.KEY_INTEGRITY);
                        dtoK2.setKeyFileName(resultKeys[1].getKeyFileName());
                        dtoK2.setKeyHash(hkey2);
                        daoFile = new MDBDAOFileInfo_1.MDBDAOFileInfo();
                        daoKey = new MDBDAOKey_1.MDBDAOKey();
                        return [4 /*yield*/, daoFile.updateFile(dtoFile)];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, daoKey.updateKey(dtoK1)];
                    case 12:
                        _b.sent();
                        return [4 /*yield*/, daoKey.updateKey(dtoK2)];
                    case 13:
                        _b.sent();
                        return [4 /*yield*/, dao_file_info.findUsers(idFile)];
                    case 14:
                        dtoUsers = _b.sent();
                        console.log(dtoUsers);
                        i = 0;
                        _b.label = 15;
                    case 15:
                        if (!(i < dtoUsers.length)) return [3 /*break*/, 18];
                        dtoUser = dtoUsers[i];
                        console.log("USER:", dtoUser);
                        return [4 /*yield*/, daoContact.findContacts(dtoUser)];
                    case 16:
                        contacts = _b.sent();
                        for (j = 0; j < contacts.length; j++) {
                            dtoContact = contacts[j];
                            console.log("CONTACT:", dtoContact);
                            if (dtoContact != undefined && dtoContact.getType() == ContactConstants_1.ContactConstants.CONTACT_EMAIL) {
                                console.log("Mail a ", dtoUser);
                                mail.notifyKeyChanged(dtoContact.getContact(), dtoUser, resultFile[0].getDecipheredName());
                            }
                        }
                        _b.label = 17;
                    case 17:
                        i++;
                        return [3 /*break*/, 15];
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    return BKey;
}());
exports.BKey = BKey;
