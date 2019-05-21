"use strict";
exports.__esModule = true;
var DTOUser = /** @class */ (function () {
    function DTOUser() {
    }
    //GETTERS
    DTOUser.prototype.getCurp = function () {
        return this.curp;
    };
    DTOUser.prototype.getName = function () {
        return this.name;
    };
    DTOUser.prototype.getLastNameA = function () {
        return this.lastname_a;
    };
    DTOUser.prototype.getLastNameB = function () {
        return this.lastname_b;
    };
    DTOUser.prototype.getBirthday = function () {
        return this.birthday;
    };
    DTOUser.prototype.getRole = function () {
        return this.role;
    };
    DTOUser.prototype.getNickname = function () {
        return this.nickname;
    };
    DTOUser.prototype.getHashPassword = function () {
        return this.hash_password;
    };
    DTOUser.prototype.isActive = function () {
        return this.active;
    };
    //SETTERS
    DTOUser.prototype.setCurp = function (curp) {
        this.curp = curp;
    };
    DTOUser.prototype.setName = function (name) {
        this.name = name;
    };
    DTOUser.prototype.setLastNameA = function (lastNameA) {
        this.lastname_a = lastNameA;
    };
    DTOUser.prototype.setLastNameB = function (lastNameB) {
        this.lastname_b = lastNameB;
    };
    DTOUser.prototype.setBirthday = function (birthday) {
        this.birthday = birthday;
    };
    DTOUser.prototype.setRole = function (role) {
        this.role = role;
        ;
    };
    DTOUser.prototype.setNickname = function (nickname) {
        this.nickname = nickname;
    };
    DTOUser.prototype.setHashPassword = function (hpassword) {
        this.hash_password = hpassword;
    };
    DTOUser.prototype.setActive = function (active) {
        this.active = active;
    };
    return DTOUser;
}());
exports.DTOUser = DTOUser;
