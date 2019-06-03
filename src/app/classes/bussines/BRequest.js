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
var MDBDAOContact_1 = require("../dataAccess/dao/MDBDAOContact");
var DTORequest_1 = require("../dataAccess/dto/DTORequest");
var MDBDAORequest_1 = require("../dataAccess/dao/MDBDAORequest");
var RequestConstants_1 = require("../utils/RequestConstants");
var MDBDAOAction_1 = require("../dataAccess/dao/MDBDAOAction");
var ActionConstants_1 = require("../utils/ActionConstants");
var Mail_1 = require("../mail/Mail");
var BRequest = /** @class */ (function () {
    function BRequest() {
    }
    BRequest.prototype.findRequestsByUser = function (nickname) {
        return __awaiter(this, void 0, void 0, function () {
            var dao_file_info, dao_request, requests, fileName, keyType, state_desc, results, i, fileId, file_1, keyTypeNum, state, dat;
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
                        fileId = requests[i].getIdFile();
                        return [4 /*yield*/, dao_file_info.findFileById(fileId)];
                    case 3:
                        file_1 = _a.sent();
                        console.log(file_1);
                        keyTypeNum = requests[i].getIdKeyType();
                        keyTypeNum ? keyType = "File" : keyType = "MAC";
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
                            idFile: fileId,
                            file: fileName,
                            keyType: keyType,
                            keyTypeNum: keyTypeNum,
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
    BRequest.prototype.findRequestByIdUserAndType = function (nickname, idFile, keyType) {
        return __awaiter(this, void 0, void 0, function () {
            var dao_file_info, dao_request, request, fileInfo, stateS, keyTypeS, state, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dao_file_info = new MDBDAOFileInfo_1.MDBDAOFileInfo();
                        dao_request = new MDBDAORequest_1.MDBDAORequest();
                        request = new DTORequest_1.DTORequest();
                        fileInfo = new Array();
                        return [4 /*yield*/, dao_request.findRequestByUserFileAndType(nickname, idFile, keyType)];
                    case 1:
                        //Obtaining the requests
                        request = _a.sent();
                        //For each request
                        if (request == undefined)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, dao_file_info.findFileById(idFile)];
                    case 2:
                        fileInfo = _a.sent();
                        (keyType == 1) ? keyTypeS = "File" : keyTypeS = "MAC";
                        state = request.getState();
                        if (state == 1)
                            stateS = "Sent";
                        else if (state == 2)
                            stateS = "Confirmed";
                        else
                            stateS = "Finished";
                        res = {
                            idFile: idFile,
                            file: fileInfo[0].getDecipheredName(),
                            keyType: keyTypeS,
                            keyTypeNum: keyType,
                            date: request.getCodeDate(),
                            state: stateS,
                            code: request.getCode()
                        };
                        return [2 /*return*/, res];
                }
            });
        });
    };
    BRequest.prototype.findRequestByState = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var dao_file_info, dao_request, request, fileInfo, stateS, keyTypeS, res, i, idFile, keyType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dao_file_info = new MDBDAOFileInfo_1.MDBDAOFileInfo();
                        dao_request = new MDBDAORequest_1.MDBDAORequest();
                        request = new Array();
                        fileInfo = new Array();
                        res = new Array();
                        return [4 /*yield*/, dao_request.findRequestsByState(state)];
                    case 1:
                        //Obtaining the requests
                        request = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < request.length)) return [3 /*break*/, 5];
                        idFile = request[i].getIdFile();
                        return [4 /*yield*/, dao_file_info.findFileById(idFile)];
                    case 3:
                        fileInfo = _a.sent();
                        keyType = request[i].getIdKeyType();
                        (keyType == 1) ? keyTypeS = "File" : keyTypeS = "MAC";
                        if (state == 1)
                            stateS = "Sent";
                        else if (state == 2)
                            stateS = "Confirmed";
                        else
                            stateS = "Finished";
                        res[i] = {
                            user: request[i].getUser(),
                            idFile: idFile,
                            file: fileInfo[0].getDecipheredName(),
                            keyType: keyTypeS,
                            keyTypeNum: keyType,
                            date: request[i].getCodeDate(),
                            state: stateS
                        };
                        _a.label = 4;
                    case 4:
                        i += 1;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, res];
                }
            });
        });
    };
    BRequest.prototype.newRequest = function (nickname, fileId, keyType) {
        return __awaiter(this, void 0, void 0, function () {
            var dao_file_info, dao_request, dto_request, dao_contact, dto_file_info, dao_action, email, mail, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dao_file_info = new MDBDAOFileInfo_1.MDBDAOFileInfo();
                        dao_request = new MDBDAORequest_1.MDBDAORequest();
                        dto_request = new DTORequest_1.DTORequest();
                        dao_contact = new MDBDAOContact_1.MDBDAOContact();
                        dto_file_info = new DTOFileInfo_1.DTOFileInfo();
                        dao_action = new MDBDAOAction_1.MDBDAOAction();
                        email = new Array();
                        mail = new Mail_1.Mail();
                        return [4 /*yield*/, dao_request.findRequestByUserFileAndType(nickname, fileId, keyType)];
                    case 1:
                        //Verify if the user already did a request for the key of this file
                        dto_request = _a.sent();
                        if (dto_request == undefined)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, dao_file_info.findFileById(fileId)];
                    case 2:
                        //Searching the specified file
                        dto_file_info = _a.sent();
                        //If the file wasn't found
                        if (dto_file_info == undefined) {
                            dao_action.createAction(nickname, ActionConstants_1.ActionConstants.ACTION_FILE_NOTFOUND);
                            return [2 /*return*/, false];
                        }
                        //If the file was found
                        else {
                            //Calculating request number and storing it into the DB
                            do {
                                code = this.generateCode();
                                console.log(code);
                                //Verifying the code is unique
                            } while (dao_request.codeCheckout(code) != undefined);
                            //Creating the new request
                            dto_request.setIdFile(fileId);
                            dto_request.setUser(nickname);
                            dto_request.setIdKeyType(keyType);
                            dto_request.setCode(code);
                            dao_request.createRequest(dto_request);
                            //Storing the actions
                            dao_action.createAction(nickname, ActionConstants_1.ActionConstants.ACTION_KEY_UNDEFINED);
                            //Sendig e-mail
                            //Searchig for the user's e-mail
                            email = dao_contact.findEmails(nickname);
                            mail.sendRequestNumber(email[0].getContact(), nickname, dto_file_info.getDecipheredName(), code);
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BRequest.prototype.confirmRequest = function (nickname, fileId, keyType, code) {
        return __awaiter(this, void 0, void 0, function () {
            var dao_file_info, dao_request, dto_request, dto_file_info, dao_action, key, fileName, dataBuf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dao_file_info = new MDBDAOFileInfo_1.MDBDAOFileInfo();
                        dao_request = new MDBDAORequest_1.MDBDAORequest();
                        dto_request = new DTORequest_1.DTORequest();
                        dto_file_info = new Array();
                        dao_action = new MDBDAOAction_1.MDBDAOAction();
                        key = new FSDAOFileData_1.FSDAOFileData();
                        return [4 /*yield*/, dao_request.findRequestByUserFileAndType(nickname, fileId, keyType)];
                    case 1:
                        //Searches the specified request
                        dto_request = _a.sent();
                        if (dto_request == undefined)
                            return [2 /*return*/, false];
                        //Code verification
                        if (dto_request.getCode() != code)
                            return [2 /*return*/, false];
                        else {
                            //Change the state of the request to confirmed
                            dto_request.setState(RequestConstants_1.RequestConstants.REQUEST_CONFIRMED);
                            //Returning the key
                            dto_file_info = dao_file_info.findFileById(fileId);
                            fileName = dto_file_info[0].getCipheredName();
                            dataBuf = key.readFile("./../../../../storage", fileName);
                            return [2 /*return*/, dataBuf.toString('base64')];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BRequest.prototype.requestFinalized = function (nickname, fileId, keyType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    BRequest.prototype.generateCode = function () {
        return Math.floor(Math.random() * (999999 - 100000));
    };
    return BRequest;
}());
exports.BRequest = BRequest;
