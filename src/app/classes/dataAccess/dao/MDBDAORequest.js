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
var DTORequest_1 = require("../dto/DTORequest");
var pool = require("../connector/Connection");
var MDBDAORequest = /** @class */ (function () {
    function MDBDAORequest() {
    }
    MDBDAORequest.prototype.createRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('CALL createRequest(?,?,?)', [request.getIdFile(),
                            request.getIdKeyType(),
                            request.getUser(),
                            request.getCode()])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MDBDAORequest.prototype.deleteRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MDBDAORequest.prototype.updateRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('CALL updateRequest(?,?,?,?,?)', [request.getIdFile(),
                            request.getIdKeyType(),
                            request.getUser(),
                            request.getState(),
                            request.getCode()])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MDBDAORequest.prototype.findRequestByUser = function (nickname) {
        return __awaiter(this, void 0, void 0, function () {
            var requests, result, i, aux;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requests = new Array();
                        return [4 /*yield*/, pool.query('CALL findRequestsByUser(?)', [nickname])];
                    case 1:
                        result = _a.sent();
                        for (i = 0; i < result[0].length; i++) {
                            aux = new DTORequest_1.DTORequest();
                            aux.setIdFile(result[0][i].id_file);
                            aux.setIdKeyType(result[0][i].id_keyType);
                            aux.setUser(result[0][i].id_user);
                            aux.setState(result[0][i].nb_state);
                            aux.setCodeDate(result[0][i].tst_code);
                            aux.setCode(result[0][i].nb_code);
                            requests.push(aux);
                        }
                        return [2 /*return*/, requests];
                }
            });
        });
    };
    MDBDAORequest.prototype.findRequestByUserAndFile = function (nickname, idFile) {
        return __awaiter(this, void 0, void 0, function () {
            var requests, result, i, aux;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requests = new Array();
                        return [4 /*yield*/, pool.query('CALL findRequestByUserAndFile(?,?)', [nickname, idFile])];
                    case 1:
                        result = _a.sent();
                        for (i = 0; i < result[0].length; i++) {
                            aux = new DTORequest_1.DTORequest();
                            aux.setIdFile(result[0][i].id_file);
                            aux.setIdKeyType(result[0][i].id_keyType);
                            aux.setUser(result[0][i].id_user);
                            aux.setState(result[0][i].nb_state);
                            aux.setCodeDate(result[0][i].tst_code);
                            aux.setCode(result[0][i].nb_code);
                            requests.push(aux);
                        }
                        return [2 /*return*/, requests];
                }
            });
        });
    };
    MDBDAORequest.prototype.findRequestByUserFileAndType = function (nickname, idFile, type) {
        return __awaiter(this, void 0, void 0, function () {
            var request, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new DTORequest_1.DTORequest();
                        return [4 /*yield*/, pool.query('CALL findRequestByUserFileType(?,?,?)', [nickname, idFile, type])];
                    case 1:
                        result = _a.sent();
                        request.setIdFile(result[0][0].id_file);
                        request.setIdKeyType(result[0][0].id_keyType);
                        request.setUser(result[0][0].id_user);
                        request.setState(result[0][0].nb_state);
                        request.setCodeDate(result[0][0].tst_code);
                        request.setCode(result[0][0].nb_code);
                        return [2 /*return*/, request];
                }
            });
        });
    };
    MDBDAORequest.prototype.codeCheckout = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var request, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new DTORequest_1.DTORequest();
                        return [4 /*yield*/, pool.query('CALL checkoutCode(?)', [code])];
                    case 1:
                        result = _a.sent();
                        request.setIdFile(result[0][0].id_file);
                        request.setIdKeyType(result[0][0].id_keyType);
                        request.setUser(result[0][0].id_user);
                        request.setState(result[0][0].nb_state);
                        request.setCodeDate(result[0][0].tst_code);
                        request.setCode(result[0][0].nb_code);
                        return [2 /*return*/, request];
                }
            });
        });
    };
    MDBDAORequest.prototype.findRequestsByState = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var requests, result, i, aux;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requests = new Array();
                        return [4 /*yield*/, pool.query('CALL findRequestsByState(?)', [state])];
                    case 1:
                        result = _a.sent();
                        for (i = 0; i < result[0].length; i++) {
                            aux = new DTORequest_1.DTORequest();
                            aux.setIdFile(result[0][i].id_file);
                            aux.setIdKeyType(result[0][i].id_keyType);
                            aux.setUser(result[0][i].id_user);
                            aux.setState(result[0][i].nb_state);
                            aux.setCodeDate(result[0][i].tst_code);
                            aux.setCode(result[0][i].nb_code);
                            requests.push(aux);
                        }
                        return [2 /*return*/, requests];
                }
            });
        });
    };
    return MDBDAORequest;
}());
exports.MDBDAORequest = MDBDAORequest;
