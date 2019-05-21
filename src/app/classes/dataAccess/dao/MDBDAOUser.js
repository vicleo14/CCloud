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
var DTOUser_1 = require("../dto/DTOUser");
var pool = require("../connector/Connection");
var MDBDAOUser = /** @class */ (function () {
    function MDBDAOUser() {
    }
    MDBDAOUser.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var state, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (user.isActive()) {
                            state = 1;
                        }
                        else {
                            state = 0;
                        }
                        return [4 /*yield*/, pool.query('CALL signIn(?,?,?,?,?,?,?,?,?)', [user.getCurp(),
                                user.getName(),
                                user.getLastNameA(),
                                user.getLastNameB(),
                                user.getBirthday(),
                                user.getRole(),
                                user.getNickname(),
                                user.getHashPassword(),
                                state
                            ])];
                    case 1:
                        query = _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    MDBDAOUser.prototype.findUsers = function (userNickname) {
        return __awaiter(this, void 0, void 0, function () {
            var user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new DTOUser_1.DTOUser();
                        return [4 /*yield*/, pool.query('CALL findUser(?)', [userNickname])];
                    case 1:
                        result = _a.sent();
                        if (result[0].length) /*REVISAR*/ {
                            user.setName(result[0][0].tx_name);
                            user.setHashPassword(result[0][0].tx_hash_password);
                            user.setActive(result[0][0].bl_state);
                            user.setCurp(result[0][0].tx_curp);
                            user.setLastNameA(result[0][0].tx_lastname_a);
                            user.setLastNameB(result[0][0].tx_lastname_b);
                            user.setBirthday(result[0][0].dt_birthday);
                            user.setRole(result[0][0].id_role);
                        }
                        else
                            throw "Usuario no encontrado.";
                        return [2 /*return*/, user];
                }
            });
        });
    };
    MDBDAOUser.prototype.updateUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('CALL updateUser(?,?,?,?,?,?,?)', [user.getName(),
                            user.getLastNameA(),
                            user.getLastNameB(),
                            user.getBirthday(),
                            user.getRole(),
                            user.getNickname(),
                            user.getHashPassword()
                        ])];
                    case 1:
                        query = _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    MDBDAOUser.prototype.deleteUser = function (userNickname) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('CALL deleteUser(?)', [userNickname])];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    MDBDAOUser.prototype.updatePassword = function (nickname, hashPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('CALL updatePassword(?,?)', [
                            nickname,
                            hashPassword
                        ])];
                    case 1:
                        query = _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    MDBDAOUser.prototype.lockUser = function (nickname) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('CALL lockUser(?)', [
                            nickname
                        ])];
                    case 1:
                        query = _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return MDBDAOUser;
}());
exports.MDBDAOUser = MDBDAOUser;
