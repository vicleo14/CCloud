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
var SHA256_1 = require("../src/app/classes/crypto/SHA256");
window.uploadFile = function (files, numType) {
    var reader = new FileReader();
    var fileS = files[0];
    reader.onload = function () {
        var readed = reader.result;
        if (numType == 0) {
            window.cipherKey = readed;
            console.log("AES:", cipherKey);
        }
        else if (numType == 1) {
            window.macKey = readed;
            console.log("MAC:", macKey);
        }
    };
    reader.readAsText(fileS);
};
window.verifykeys = function () {
    console.log("INICIA VERIFY");
    var hash = new SHA256_1.SHA256();
    var infoKeys = {
        id: fileID,
        hashKey: "",
        hashMac: ""
    };
    //console.log(infoKeys);
    var petition = new XMLHttpRequest;
    var data = JSON.stringify(infoKeys);
    petition.open("POST", "http://localhost:3000/key/findHashes");
    petition.setRequestHeader("Content-Type", "application/json");
    petition.send(data);
    petition.onreadystatechange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(petition.readyState == 4)) return [3 /*break*/, 3];
                        values = JSON.parse(petition.response);
                        //console.log("Termina peticion servidor.Comenzando verificacion",values);
                        petition.abort();
                        if (!(hash.compareHash(macKey, values.hashMac) && hash.compareHash(cipherKey, values.hashKey))) return [3 /*break*/, 2];
                        //console.log("Verified. Begin download");
                        alert("Great! Wait a moment while we recolect your file's data");
                        return [4 /*yield*/, downloadData()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        alert("Some of your keys is wrong. Please verify the files =)");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
};
function downloadData() {
    return __awaiter(this, void 0, void 0, function () {
        var cipher, infoFile, data, petition;
        return __generator(this, function (_a) {
            cipher = new AES256_1.AES256();
            console.log("Begin download");
            infoFile = {
                id: fileID,
                dataFile: ""
            };
            console.log(infoFile);
            data = JSON.stringify(infoFile);
            petition = new XMLHttpRequest;
            console.log(data);
            petition.open("POST", "http://localhost:3000/user/download-file");
            petition.setRequestHeader("Content-Type", "application/json");
            petition.send(data);
            petition.onreadystatechange = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var values, cipheredData, buf;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(petition.readyState == 4)) return [3 /*break*/, 2];
                                values = JSON.parse(petition.response);
                                console.log("Termina peticion servidor.Comenzando decifrado", values);
                                petition.abort();
                                cipheredData = values.dataFile;
                                buf = Buffer.from(cipheredData, "base64");
                                console.log(buf);
                                return [4 /*yield*/, cipher.decipherFile(buf, cipherKey)];
                            case 1:
                                result = _a.sent();
                                console.log(result);
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                });
            };
            return [2 /*return*/];
        });
    });
}
