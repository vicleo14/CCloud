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
var DTORequest_1 = require("../dataAccess/dto/DTORequest");
var MDBDAORequest_1 = require("../dataAccess/dao/MDBDAORequest");
var DTOAction_1 = require("../dataAccess/dto/DTOAction");
var MDBDAOAction_1 = require("../dataAccess/dao/MDBDAOAction");
var ActionConstants_1 = require("../utils/ActionConstants");
var express = require("express");
var app = express();
var BRequest = /** @class */ (function () {
    function BRequest() {
    }
    BRequest.prototype.findRequestsByUser = function (nickname) {
        return __awaiter(this, void 0, void 0, function () {
            var dao_file_info, dao_request, requests, fileName, keyType, state_desc, results, i, file_1, state, dat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dao_file_info = new MDBDAOFileInfo_1.MDBDAOFileInfo();
                        dao_request = new MDBDAORequest_1.MDBDAORequest();
                        requests = new Array();
                        results = new Array();
                        return [4 /*yield*/, dao_request.findRequestByUser(nickname)];
                    case 1:
                        //Obtaining the requests
                        requests = _a.sent();
                        console.log(requests.length);
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < requests.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, dao_file_info.findFileById(requests[i].getIdFile())];
                    case 3:
                        file_1 = _a.sent();
                        console.log(file_1);
                        //Type of the key which was made the request
                        requests[i].getIdKeyType() ? keyType = "File" : keyType = "MAC";
                        //Name of the file
                        fileName = file_1[0].getDecipheredName();
                        ;
                        state = requests[i].getState();
                        if (state == 1)
                            state_desc = "Sent";
                        else if (state == 2)
                            state_desc = "Confirmed";
                        else
                            state_desc = "Finished";
                        dat = requests[i].getCodeDate();
                        results[i] = {
                            file: fileName,
                            keyType: keyType,
                            date: dat,
                            state: state_desc
                        };
                        console.log(results[i]);
                        _a.label = 4;
                    case 4:
                        i += 1;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, results];
                }
            });
        });
    };
    BRequest.prototype.newRequest = function (nickname, fileId, keyType) {
        return __awaiter(this, void 0, void 0, function () {
            var dao_file_info, dao_request, dto_request, requestsMade, dto_file_info, dto_action, dao_action, _i, requestsMade_1, req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dao_file_info = new MDBDAOFileInfo_1.MDBDAOFileInfo();
                        dao_request = new MDBDAORequest_1.MDBDAORequest();
                        dto_request = new DTORequest_1.DTORequest();
                        requestsMade = new Array();
                        dto_file_info = new DTOFileInfo_1.DTOFileInfo();
                        dto_action = new DTOAction_1.DTOAction();
                        dao_action = new MDBDAOAction_1.MDBDAOAction();
                        return [4 /*yield*/, dao_request.findRequestByUserAndFile(nickname, fileId)];
                    case 1:
                        //Verify if the user already did a request for the key of this file
                        requestsMade = _a.sent();
                        for (_i = 0, requestsMade_1 = requestsMade; _i < requestsMade_1.length; _i++) {
                            req = requestsMade_1[_i];
                            if (req.getIdKeyType() == keyType)
                                return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, dao_file_info.findFileById(fileId)];
                    case 2:
                        //Searching the specified file
                        dto_file_info = _a.sent();
                        //If the file wasn't found
                        if (dto_file_info == null) {
                            dao_action.createAction(nickname, ActionConstants_1.ActionConstants.ACTION_FILE_NOTFOUND);
                            return [2 /*return*/, false];
                        }
                        //If the file was found
                        else {
                            //Creating the new request
                            dto_request.setIdFile(fileId);
                            dto_request.setUser(nickname);
                            dto_request.setIdKeyType(keyType);
                            dao_request.createRequest(dto_request);
                            //Storing the actions
                            dao_action.createAction(nickname, ActionConstants_1.ActionConstants.ACTION_KEY_UNDEFINED);
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BRequest.prototype.confirmRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    BRequest.prototype.requestFinalized = function (nickname) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return BRequest;
}());
exports.BRequest = BRequest;
