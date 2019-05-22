"use strict";
exports.__esModule = true;
var DTOFileInfo = /** @class */ (function () {
    function DTOFileInfo() {
    }
    /* GETTERS */
    DTOFileInfo.prototype.getId = function () {
        return this.id;
    };
    DTOFileInfo.prototype.getCipheredName = function () {
        return this.cipheredName;
    };
    DTOFileInfo.prototype.getDecipheredName = function () {
        return this.decipheredName;
    };
    DTOFileInfo.prototype.getMAC = function () {
        return this.mac;
    };
    DTOFileInfo.prototype.getSize = function () {
        return this.size;
    };
    DTOFileInfo.prototype.getDate = function () {
        return this.date;
    };
    /* SETTERS */
    DTOFileInfo.prototype.setId = function (id) {
        this.id = id;
    };
    DTOFileInfo.prototype.setCipheredName = function (cipheredName) {
        this.cipheredName = cipheredName;
    };
    DTOFileInfo.prototype.setDecipheredName = function (decipheredName) {
        this.decipheredName = decipheredName;
    };
    DTOFileInfo.prototype.setMAC = function (mac) {
        this.mac = mac;
    };
    DTOFileInfo.prototype.setSize = function (size) {
        this.size = size;
    };
    DTOFileInfo.prototype.setDate = function (date) {
        this.date = date;
    };
    return DTOFileInfo;
}());
exports.DTOFileInfo = DTOFileInfo;
