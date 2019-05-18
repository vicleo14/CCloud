"use strict";
exports.__esModule = true;
var DTOKey = /** @class */ (function () {
    function DTOKey() {
    }
    /* SETTERS */
    DTOKey.prototype.setIdFile = function (idFile) {
        this.idFile = idFile;
    };
    DTOKey.prototype.setIdType = function (idType) {
        this.idType = idType;
    };
    DTOKey.prototype.setKeyFileName = function (keyFileName) {
        this.keyFileName = keyFileName;
    };
    DTOKey.prototype.setKeyHash = function (keyHash) {
        this.keyHash = keyHash;
    };
    /* GETTERS */
    DTOKey.prototype.getIdFile = function () {
        return this.idFile;
    };
    DTOKey.prototype.getIdType = function () {
        return this.idType;
    };
    DTOKey.prototype.getKeyFileName = function () {
        return this.keyFileName;
    };
    DTOKey.prototype.getKeyHash = function () {
        return this.keyHash;
    };
    return DTOKey;
}());
exports.DTOKey = DTOKey;
