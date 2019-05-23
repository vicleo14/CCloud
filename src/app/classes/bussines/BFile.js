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
var RandomGenerator_1 = require("../crypto/RandomGenerator");
var CryptoConstants_1 = require("../utils/CryptoConstants");
var HMac_1 = require("../crypto/HMac");
var SHA256_1 = require("../crypto/SHA256");
//import {downloadData} from "../utils/downloadDataType";
var BKey_1 = require("./BKey");
var BFile = /** @class */ (function () {
    function BFile() {
        //Getting server keys
        //this.publicKey = fs.readFileSync("../../../../local/publicKey.txt").toString();
        //this.privateKey = fs.readFileSync("../../../../local/privateKey.txt").toString();
        this.bsKey = new BKey_1.BKey();
    }
    BFile.prototype.uploadFile = function (nickname, name, cfile, size, cipheredKeyMAC, MAC, cipheredKey, hashMac, hashKeyFile) {
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
        //Decryption of the MACs key
        var decipheredKeyMAC = rsa.privateDecryption(this.privateKey, cipheredKeyMAC, 'camaleon').toString();
        //Decryption of the file's key
        var decipheredKeyFile = rsa.privateDecryption(this.privateKey, cipheredKey, 'camaleon').toString();
        //Verifying keyMacHash and keyFileHash 
        if (hash.compareHash(hash.calculateHash(decipheredKeyMAC), hashMac) && hash.compareHash(hash.calculateHash(decipheredKeyFile), hashKeyFile)) {
            //Verifying the MAC
            if (hmac.verifyMac(cfile.toString(), decipheredKeyMAC, MAC)) {
                //File's name encryption
                var keyGen = new RandomGenerator_1.RandomGenerator();
                var aes = new AES256_1.AES256();
                var key_name = keyGen.generateRandom(CryptoConstants_1.CryptoConstants.AES_KEYSIZE_BYTES);
                var cipheredName = aes.cipher(name, key_name);
                //var cipheredName = rsa.privateEncryption(this.privateKey, name, 'camaleon');
                //Creating the file
                dto_file_data.setFileName(cipheredName);
                dto_file_data.setData(cfile);
                dao_file_data.createFile("../../../../storage/", "", dto_file_data); //Revisar
                //Obtaining the date
                var date = new Date();
                //Calculating id
                var id = nickname.concat(cipheredName, date.toString().slice(0, 24));
                //Filling file's information
                dto_file_info.setCipheredName(cipheredName);
                dto_file_info.setSize(size);
                dto_file_info.setDecipheredName(name);
                dto_file_info.setId(id);
                dto_file_info.setMAC(MAC);
                dto_file_info.setDate(date);
                dao_file_info.createFile(nickname, dto_file_info);
                //Hashing file's key
                var hashedKey = hash.calculateHash(cipheredKey.toString('base64'));
                //Filling key's information
                dto_key.setIdFile(dto_file_info.getId());
                dto_key.setIdType(1);
                dto_key.setKeyHash(hashedKey);
                dto_key.setKeyFileName(key_name);
                dao_key.createKey(dto_key);
                //Filling actions
                dao_action.createAction(nickname, 2001);
                dao_action.createAction(nickname, 3006);
                return true;
            }
            else {
                dao_action.createAction(nickname, 2005);
                return false;
            }
        }
        return false;
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
            var decipheredKeyMAC = rsa.privateDecryption(this.privateKey, cipheredKeyMAC, 'camaleon');
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
    BFile.prototype.saveFile = function (nickname, name, cfile, size, cipheredKeyMAC, MAC, cipheredKey, hashKey, hashMac) {
        return __awaiter(this, void 0, void 0, function () {
            var decipheredKeyC, decipheredKeyM;
            return __generator(this, function (_a) {
                if ((decipheredKeyC = this.bsKey.decipherKey(cipheredKey, hashKey)) != undefined && (decipheredKeyM = this.bsKey.decipherKey(cipheredKeyMAC, hashMac)) != undefined) {
                    console.log("Llaves coinciden");
                }
                return [2 /*return*/, true];
            });
        });
    };
    return BFile;
}());
exports.BFile = BFile;
