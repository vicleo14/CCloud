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
var DTOUser_1 = require("../dataAccess/dto/DTOUser");
var MDBDAOUser_1 = require("../dataAccess/dao/MDBDAOUser");
var DTOAction_1 = require("../dataAccess/dto/DTOAction");
var MDBDAOAction_1 = require("../dataAccess/dao/MDBDAOAction");
var DTOContact_1 = require("../dataAccess/dto/DTOContact");
var MDBDAOContact_1 = require("../dataAccess/dao/MDBDAOContact");
var ContactConstants_1 = require("../utils/ContactConstants");
var ActionConstants_1 = require("../utils/ActionConstants");
var Mail_1 = require("../mail/Mail");
var BUser = /** @class */ (function () {
    function BUser() {
        this.loginTries = 0;
    }
    BUser.prototype.createUser = function (curp, name, l_name_a, l_name_b, birth, role, nickn, pass, email) {
        return __awaiter(this, void 0, void 0, function () {
            var mailSender, dto_user, dto_action, dto_contact, dao_user, band_email, regexpEmail, dao_contact, cont, x_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mailSender = new Mail_1.Mail();
                        dto_user = new DTOUser_1.DTOUser();
                        dto_action = new DTOAction_1.DTOAction();
                        dto_contact = new DTOContact_1.DTOContact();
                        dao_user = new MDBDAOUser_1.MDBDAOUser();
                        return [4 /*yield*/, dao_user.findUsers(nickn)];
                    case 1:
                        if (!((_a.sent()) == undefined)) return [3 /*break*/, 9];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, 7, 8]);
                        //    return false;
                        //If there's no othe user with the same nickname, continues the process
                        dto_user.setCurp(curp);
                        dto_user.setName(name);
                        dto_user.setLastNameA(l_name_a);
                        dto_user.setLastNameB(l_name_b);
                        dto_user.setBirthday(birth);
                        dto_user.setRole(role);
                        dto_user.setNickname(nickn);
                        dto_user.setHashPassword(pass);
                        dto_user.setActive(true);
                        console.log("paso");
                        band_email = false;
                        regexpEmail = new RegExp('/^((?!(@)).)*$/');
                        /*for(let cont of contact){
                            if(!regexpEmail){
                                band_email = true;
                                break;
                            }
                        }*/
                        //If there's no email, returns false
                        //if(!band_email)
                        //   return false;
                        //If there's an email, continues the user creation process
                        return [4 /*yield*/, dao_user.createUser(dto_user)];
                    case 3:
                        /*for(let cont of contact){
                            if(!regexpEmail){
                                band_email = true;
                                break;
                            }
                        }*/
                        //If there's no email, returns false
                        //if(!band_email)
                        //   return false;
                        //If there's an email, continues the user creation process
                        _a.sent();
                        console.log("usuario creado");
                        dao_contact = new MDBDAOContact_1.MDBDAOContact();
                        cont = 0;
                        /*for(let cont of contact){
                            dto_contact.setContact(cont);
                            dto_contact.setContatType(typeContact[cont]);
                            dao_contact.createContact(nickn, dto_contact);
                            cont+=1;
                        }*/
                        dto_contact.setContact(email);
                        dto_contact.setContatType(ContactConstants_1.ContactConstants.CONTACT_EMAIL);
                        return [4 /*yield*/, dao_contact.createContact(nickn, dto_contact)];
                    case 4:
                        _a.sent();
                        /* ENVIAMOS CORREO */
                        mailSender.sendWelcome(email, nickn);
                        return [3 /*break*/, 8];
                    case 5:
                        x_1 = _a.sent();
                        console.log("error:", x_1);
                        return [4 /*yield*/, dao_user.deleteUser(nickn)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, true];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        console.log("El usuario ya existe");
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    BUser.prototype.userLogin = function (nickname, password) {
        return __awaiter(this, void 0, void 0, function () {
            var dto_user, dto_action, dao_user, dao_action;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dto_user = new DTOUser_1.DTOUser();
                        dto_action = new DTOAction_1.DTOAction();
                        dao_user = new MDBDAOUser_1.MDBDAOUser();
                        dao_action = new MDBDAOAction_1.MDBDAOAction();
                        return [4 /*yield*/, dao_user.findUsers(nickname)];
                    case 1:
                        //Searches the user in the system
                        dto_user = _a.sent();
                        if (dto_user != undefined) {
                            //If the password is correct
                            if (dto_user.getHashPassword() === password) {
                                console.log("iguales");
                                //dto_action.addAction(1001);
                                //dao_action.createAction(dto_action); 
                                dao_action.createAction(nickname, ActionConstants_1.ActionConstants.ACTION_SESSION_LOGINSUCCESSFUL);
                                //Se sube un usuario a sesión
                                dto_user.setHashPassword("");
                                return [2 /*return*/, dto_user];
                            }
                            //If it isn't
                            else {
                                //dto_action.addAction(1002);
                                this.loginTries++;
                                //If it's users third try 
                                if (this.loginTries == 3) {
                                    dto_user.setActive(false);
                                    dao_user.updateUser(dto_user);
                                    //dto_action.setActions([1005, 1003]);
                                    //dao_action.createAction(dto_action);
                                }
                                return [2 /*return*/, null];
                            }
                        }
                        else
                            console.log("Usuario inexistente");
                        return [2 /*return*/];
                }
            });
        });
    };
    BUser.prototype.userLogout = function (nickname) {
        return;
    };
    return BUser;
}());
exports.BUser = BUser;
