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
//tsc test/testUser.ts
//node test/testUser.js 
var DTOUser_1 = require("../src/app/classes/dataAccess/dto/DTOUser");
var MDBDAOUser_1 = require("../src/app/classes/dataAccess/dao/MDBDAOUser");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var user, daoUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Pruebas de DAO para User:");
                    user = new DTOUser_1.DTOUser();
                    daoUser = new MDBDAOUser_1.MDBDAOUser();
                    /*Agregar un usuario con DAO*/
                    user.setCurp("XXXXXXXXXXXXXXXX10");
                    user.setName("Lina");
                    user.setLastNameA("Morales");
                    user.setLastNameB("Flores");
                    user.setNickname("lina10");
                    user.setBirthday(new Date());
                    user.setRole(0);
                    user.setHashPassword("jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=");
                    user.setActive(true);
                    return [4 /*yield*/, daoUser.createUser(user)];
                case 1:
                    _a.sent();
                    /*Modificar usuario */
                    /*user.setName("Victor");
                    user.setRole(1);
                    await daoUser.updateUser(user);*/
                    /*Update password */
                    /* daoUser.updatePassword("vicleo14","jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=");
                     
                     */
                    /*Buscar usuario con DAO*/
                    /*
                    user= await daoUser.findUsers("vicleo14");
                    console.log(user.getName());
                    console.log(user.getLastNameA());
                    console.log(user.getLastNameB());
                    console.log(user.getBirthday());
                    console.log(user.getRole());*/
                    /*Bloquer usuario*/
                    /*await daoUser.lockUser("vicleo14");*/
                    /*Delete user*/
                    /*await daoUser.deleteUser("vicleo14");*/
                    console.log("Termina opearcion");
                    return [2 /*return*/];
            }
        });
    });
}
main();
