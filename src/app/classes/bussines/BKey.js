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
var SHA256_1 = require("../crypto/SHA256");
var FSDAOFileData_1 = require("../dataAccess/dao/FSDAOFileData");
var RSA_1 = require("../crypto/RSA");
var MDBDAOKey_1 = require("../dataAccess/dao/MDBDAOKey");
var filestr = require('fs');
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
    return BKey;
}());
exports.BKey = BKey;
