"use strict";
//tsc test/TDAO_User.ts
//node test/TDAO_User.js 
exports.__esModule = true;
var DTOUser_1 = require("../src/app/classes/dataAccess/dto/DTOUser");
var MDBDAOUser_1 = require("../src/app/classes/dataAccess/dao/MDBDAOUser");
var TDAO_User = /** @class */ (function () {
    function TDAO_User() {
    }
    TDAO_User.prototype.main = function () {
        console.log("Hola");
        var contacts = ["prueba@correo.com"];
        console.log(contacts[0]);
        var user = new DTOUser_1.DTOUser();
        //user.setCurp("000000000000000000");
        //user.setName("Prueba");
        //user.setLastNameA("Prueba");
        //user.setLastNameB("Prueba");
        user.setNickname("prueba1");
        //user.setBirthday(new Date());
        //user.setRole(1);
        //user.setHashPassword("XXXXXXXX"); 
        //user.setActive(true);
        //user.setContacts(contacts);
        var daoUser = new MDBDAOUser_1.MDBDAOUser();
        var aux = daoUser.findUsers(user);
    };
    return TDAO_User;
}());
exports.TDAO_User = TDAO_User;
var tdaouser = new TDAO_User();
tdaouser.main();
