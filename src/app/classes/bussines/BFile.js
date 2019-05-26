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
var DTOFileData_1 = require("../dataAccess/dto/DTOFileData");
var FSDAOFileData_1 = require("../dataAccess/dao/FSDAOFileData");
var DTOAction_1 = require("../dataAccess/dto/DTOAction");
var MDBDAOAction_1 = require("../dataAccess/dao/MDBDAOAction");
var DTOKey_1 = require("../dataAccess/dto/DTOKey");
var MDBDAOKey_1 = require("../dataAccess/dao/MDBDAOKey");
var RSA_1 = require("../crypto/RSA");
var AES256_1 = require("../crypto/AES256");
var HMac_1 = require("../crypto/HMac");
var SHA256_1 = require("../crypto/SHA256");
var ExtensionConstants_1 = require("../utils/ExtensionConstants");
var ActionConstants_1 = require("../utils/ActionConstants");
var KeyConstants_1 = require("../utils/KeyConstants");
//import {downloadData} from "../utils/downloadDataType";
var BKey_1 = require("./BKey");
var dateFormat = require("dateformat");
var name1 = "cipheredData" + ExtensionConstants_1.ExtensionConstants.GENERIC_EXTENSION;
var name2 = "key" + ExtensionConstants_1.ExtensionConstants.CIPHERKEYC_EXTENSION;
var name3 = "mac" + ExtensionConstants_1.ExtensionConstants.MACKEYC_EXTENSION;
var path = "storage/";
var BFile = /** @class */ (function () {
    function BFile() {
        //Getting server keys
        //this.publicKey = fs.readFileSync("../../../../local/publicKey.txt").toString();
        //this.privateKey = fs.readFileSync("../../../../local/privateKey.txt").toString();
        this.bsKey = new BKey_1.BKey();
    }
    BFile.prototype.uploadFile = function (nickname, name, cfile, size, cipheredKeyMAC, MAC, cipheredKey, hashMac, hashKeyFile) {
        return __awaiter(this, void 0, void 0, function () {
            var dto_file_info, dto_file_data, dto_action, dto_key, dao_file_info, dao_file_data, dao_action, dao_key, hmac, hash, rsa, decipheredKeyMAC, decipheredKeyFile, date, split, id, hashedKey;
            return __generator(this, function (_a) {
                dto_file_info = new DTOFileInfo_1.DTOFileInfo();
                dto_file_data = new DTOFileData_1.DTOFileData();
                dto_action = new DTOAction_1.DTOAction();
                dto_key = new DTOKey_1.DTOKey();
                dao_file_info = new MDBDAOFileInfo_1.MDBDAOFileInfo();
                dao_file_data = new FSDAOFileData_1.FSDAOFileData();
                dao_action = new MDBDAOAction_1.MDBDAOAction();
                dao_key = new MDBDAOKey_1.MDBDAOKey();
                hmac = new HMac_1.HMac();
                hash = new SHA256_1.SHA256();
                rsa = new RSA_1.RSA();
                decipheredKeyMAC = rsa.privateDecryption(this.privateKey, cipheredKeyMAC, 'camaleon').toString();
                decipheredKeyFile = rsa.privateDecryption(this.privateKey, cipheredKey, 'camaleon').toString();
                //Verifying keyMacHash and keyFileHash 
                if (hash.compareHash(hash.calculateHash(decipheredKeyMAC), hashMac) && hash.compareHash(hash.calculateHash(decipheredKeyFile), hashKeyFile)) {
                    //Verifying the MAC
                    if (hmac.verifyMac(cfile.toString(), decipheredKeyMAC, MAC)) {
                        date = new Date();
                        split = name.split(".");
                        id = nickname + name + dateFormat(new Date(), "yyyyMMddhhMMss");
                        //Filling file's information
                        dto_file_info.setCipheredName(id + ExtensionConstants_1.ExtensionConstants.GENERIC_EXTENSION);
                        dto_file_info.setSize(size);
                        dto_file_info.setDecipheredName(name);
                        dto_file_info.setId(id);
                        dto_file_info.setMAC(MAC);
                        dto_file_info.setDate(date);
                        dao_file_info.createFile(nickname, dto_file_info);
                        hashedKey = hash.calculateHash(cipheredKey.toString('base64'));
                        //Filling file's key information
                        dto_key.setIdFile(id);
                        dto_key.setIdType(KeyConstants_1.KeyConstants.KEY_CIPHER_DECIPHER);
                        dto_key.setKeyHash(hashKeyFile);
                        dto_key.setKeyFileName(id + ExtensionConstants_1.ExtensionConstants.CIPHERKEYC_EXTENSION);
                        dao_key.createKey(dto_key);
                        //Filling MAC's key information
                        dto_key.setIdFile(id);
                        dto_key.setIdType(KeyConstants_1.KeyConstants.KEY_INTEGRITY);
                        dto_key.setKeyHash(hashMac);
                        dto_key.setKeyFileName(id + ExtensionConstants_1.ExtensionConstants.MACKEYC_EXTENSION);
                        dao_key.createKey(dto_key);
                        //Creating the files
                        dao_file_data.createFile(path, id + ExtensionConstants_1.ExtensionConstants.GENERIC_EXTENSION, cfile);
                        dao_file_data.createFile(path, id + ExtensionConstants_1.ExtensionConstants.CIPHERKEYC_EXTENSION, cipheredKey);
                        dao_file_data.createFile(path, id + ExtensionConstants_1.ExtensionConstants.MACKEYC_EXTENSION, cipheredKeyMAC);
                        //Filling actions
                        dao_action.createAction(nickname, ActionConstants_1.ActionConstants.ACTION_FILE_UPLOADED);
                        dao_action.createAction(nickname, ActionConstants_1.ActionConstants.ACTION_KEY_MACUPLOADED);
                        return [2 /*return*/, true];
                    }
                    else {
                        dao_action.createAction(nickname, ActionConstants_1.ActionConstants.ACTION_FILE_CORRUPTED);
                        return [2 /*return*/, false];
                    }
                }
                return [2 /*return*/, false];
            });
        });
    };
    BFile.prototype.downloadFile = function (nickname, fileName) {
        var dto_file_info = new DTOFileInfo_1.DTOFileInfo();
        var dto_file_data = new DTOFileData_1.DTOFileData();
        var dto_action = new DTOAction_1.DTOAction();
        var dto_key = new DTOKey_1.DTOKey();
        var dao_file_info = new MDBDAOFileInfo_1.MDBDAOFileInfo();
        var dao_file_data = new FSDAOFileData_1.FSDAOFileData();
        var dao_action = new MDBDAOAction_1.MDBDAOAction();
        var dao_key = new MDBDAOKey_1.MDBDAOKey();
        var hmac = new HMac_1.HMac();
        var hash = new SHA256_1.SHA256();
        var rsa = new RSA_1.RSA();
        //Searching the file
        var files = new Array();
        files = dao_file_info.findFilesByUser(nickname);
        var i = 0;
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var f = files_1[_i];
            if (f[i].getDecipheredName() == fileName) {
                dto_file_info = f[i];
                break;
            }
            i += 1;
        }
        //If the file wasn't found
        if (dto_file_info.getId() == null) {
            dao_action.createAction(nickname, 2004);
            return null;
        }
        //If the file was found
        else {
            //Obtaining file's data
            var data = dao_file_data.readFile("../uploadedFiles", dto_file_info.getCipheredName());
            dao_action.createAction(nickname, 2002);
            var data_to_return;
            data_to_return.data = data;
            data_to_return.fileName = dto_file_info.getDecipheredName();
            data_to_return.MAC = dto_file_info.getMAC();
            return data_to_return;
        }
    };
    BFile.prototype.updateFile = function (nickname, name, cfile, size, cipheredKeyMAC, MAC, cipheredKey) {
        var dto_file_info = new DTOFileInfo_1.DTOFileInfo();
        var dto_file_data = new DTOFileData_1.DTOFileData();
        var dto_action = new DTOAction_1.DTOAction();
        var dto_key = new DTOKey_1.DTOKey();
        var dao_file_info = new MDBDAOFileInfo_1.MDBDAOFileInfo();
        var dao_file_data = new FSDAOFileData_1.FSDAOFileData();
        var dao_action = new MDBDAOAction_1.MDBDAOAction();
        var dao_key = new MDBDAOKey_1.MDBDAOKey();
        var hmac = new HMac_1.HMac();
        var hash = new SHA256_1.SHA256();
        var rsa = new RSA_1.RSA();
        //Searching for the file
        var files = new Array();
        files = dao_file_info.findFilesByUser(nickname);
        var i = 0;
        for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
            var f = files_2[_i];
            if (f[i].getDecipheredName() == name) {
                dto_file_info = f[i];
                break;
            }
            i += 1;
        }
        //If the file wasn't found
        if (dto_file_info.getId() == null) {
            dao_action.createAction(nickname, 2004);
            return false;
        }
        else {
            //Decryption of the MACs key
            var decipheredKeyMAC = rsa.privateDecryption(this.privateKey, cipheredKeyMAC, 'rocanrol');
            //Verifying the MAC
            if (hmac.verifyMac(cfile.toString(), decipheredKeyMAC.toString(), MAC)) {
                //Obtaining the date
                var date = new Date();
                dto_file_info.setSize(size);
                dto_file_info.setMAC(MAC);
                dto_file_info.setDate(date);
                dao_file_info.updateFile(dto_file_info);
                dao_action.createAction(nickname, 2000);
                dao_action.createAction(nickname, 3006);
                return true;
            }
            else {
                dao_action.createAction(nickname, 2005);
                return false;
            }
        }
    };
    BFile.prototype.deleteFile = function (nickname, fileName) {
        var dto_file_info = new DTOFileInfo_1.DTOFileInfo();
        var dto_action = new DTOAction_1.DTOAction();
        var dao_file_info = new MDBDAOFileInfo_1.MDBDAOFileInfo();
        var dao_file_data = new FSDAOFileData_1.FSDAOFileData();
        var dao_action = new MDBDAOAction_1.MDBDAOAction();
        //Searching the file
        var files = new Array();
        files = dao_file_info.findFilesByUser(nickname);
        var i = 0;
        for (var _i = 0, files_3 = files; _i < files_3.length; _i++) {
            var f = files_3[_i];
            if (f[i].getDecipheredName() == fileName) {
                dto_file_info = f[i];
                break;
            }
            i += 1;
        }
        //If the file wasn't found
        if (dto_file_info.getId() == null) {
            dao_action.createAction(nickname, 2004);
            return false;
        }
        //If the file was found
        else {
            dao_file_info.deleteFile(dto_file_info.getId());
            dao_action.createAction(nickname, 2000);
            return true;
        }
    };
    BFile.prototype.decipherFile = function (data, key, macKey, tag) {
        return __awaiter(this, void 0, void 0, function () {
            var result, mac, blockCipher, buf, x_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = undefined;
                        mac = new HMac_1.HMac();
                        blockCipher = new AES256_1.AES256();
                        if (!mac.verifyMac(data, macKey, tag)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        buf = Buffer.from(data, "base64");
                        console.log(buf);
                        return [4 /*yield*/, blockCipher.decipherFile(buf, key)];
                    case 2:
                        result = _a.sent();
                        console.log("Decipher result:", Buffer.from(buf));
                        console.log("Decipher size A:", Buffer.from(result).length);
                        return [3 /*break*/, 4];
                    case 3:
                        x_1 = _a.sent();
                        console.log("Something is wrong:", x_1);
                        result = undefined;
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        result = undefined;
                        _a.label = 6;
                    case 6: return [2 /*return*/, result];
                }
            });
        });
    };
    BFile.prototype.saveFile = function (nickname, name, cfile, size, cipheredKeyMAC, MAC, cipheredKey, hashKey, hashMac) {
        return __awaiter(this, void 0, void 0, function () {
            var fs, decipheredKeyC, decipheredKeyM, _a, split, nomArcG, clave, nomMAC, nomKey, name1, dtoFile, dtoK1, dtoK2, daoFile, daoKey;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fs = new FSDAOFileData_1.FSDAOFileData();
                        return [4 /*yield*/, this.bsKey.decipherKey(cipheredKey, hashKey)];
                    case 1:
                        _a = (decipheredKeyC = _b.sent()) != undefined;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.bsKey.decipherKey(cipheredKeyMAC, hashMac)];
                    case 2:
                        _a = (decipheredKeyM = _b.sent()) != undefined;
                        _b.label = 3;
                    case 3:
                        if (!_a) return [3 /*break*/, 7];
                        split = name.split(".");
                        nomArcG = nickname + split[0] + dateFormat(new Date(), "yyyyMMddhhMMss");
                        clave = nomArcG;
                        nomMAC = nomArcG + ExtensionConstants_1.ExtensionConstants.MACKEYC_EXTENSION;
                        nomKey = nomArcG + ExtensionConstants_1.ExtensionConstants.CIPHERKEYC_EXTENSION;
                        name1 = nomArcG + ExtensionConstants_1.ExtensionConstants.GENERIC_EXTENSION;
                        fs.createFile(path, name1, cfile);
                        fs.createFile(path, nomKey, cipheredKey);
                        fs.createFile(path, nomMAC, cipheredKeyMAC);
                        dtoFile = new DTOFileInfo_1.DTOFileInfo();
                        dtoFile.setId(clave);
                        dtoFile.setDecipheredName(name);
                        dtoFile.setCipheredName(name1);
                        dtoFile.setMAC(MAC);
                        dtoFile.setDate(new Date());
                        dtoFile.setSize(size);
                        dtoK1 = new DTOKey_1.DTOKey();
                        dtoK1.setIdFile(clave);
                        dtoK1.setIdType(KeyConstants_1.KeyConstants.KEY_CIPHER_DECIPHER);
                        dtoK1.setKeyFileName(nomKey);
                        dtoK1.setKeyHash(hashKey);
                        dtoK2 = new DTOKey_1.DTOKey();
                        dtoK2.setIdFile(clave);
                        dtoK2.setIdType(KeyConstants_1.KeyConstants.KEY_INTEGRITY);
                        dtoK2.setKeyFileName(nomMAC);
                        dtoK2.setKeyHash(hashMac);
                        daoFile = new MDBDAOFileInfo_1.MDBDAOFileInfo();
                        daoKey = new MDBDAOKey_1.MDBDAOKey();
                        return [4 /*yield*/, daoFile.createFile(nickname, dtoFile)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, daoKey.createKey(dtoK1)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, daoKey.createKey(dtoK2)];
                    case 6:
                        _b.sent();
                        //var decipheredFile=await this.decipherFile(cfile,decipheredKeyC,decipheredKeyM,MAC);
                        //fs.createFile(path,name,Buffer.from(decipheredFile));
                        console.log("That's ok");
                        return [2 /*return*/, true];
                    case 7:
                        console.log("Something was wrokg");
                        return [2 /*return*/, false];
                }
            });
        });
    };
    return BFile;
}());
exports.BFile = BFile;
