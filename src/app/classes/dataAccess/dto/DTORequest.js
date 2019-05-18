"use strict";
exports.__esModule = true;
var DTORequest = /** @class */ (function () {
    function DTORequest() {
    }
    /* SETTERS */
    DTORequest.prototype.setUser = function (nickname) {
        this.user = nickname;
    };
    DTORequest.prototype.setIdFile = function (idFile) {
        this.idFile = idFile;
    };
    DTORequest.prototype.setIdKeyType = function (idKeyType) {
        this.idKeyType = idKeyType;
    };
    DTORequest.prototype.setCodeDate = function (codeDate) {
        this.codeDate = codeDate;
    };
    DTORequest.prototype.setCode = function (code) {
        this.code = code;
    };
    DTORequest.prototype.setState = function (state) {
        this.state = state;
    };
    /* GETTERS */
    DTORequest.prototype.getIdFile = function () {
        return this.idFile;
    };
    DTORequest.prototype.getIdKeyType = function () {
        return this.idKeyType;
    };
    DTORequest.prototype.getCodeDate = function () {
        return this.codeDate;
    };
    DTORequest.prototype.getCode = function () {
        return this.code;
    };
    DTORequest.prototype.getState = function () {
        return this.state;
    };
    DTORequest.prototype.getUser = function () {
        return this.user;
    };
    return DTORequest;
}());
exports.DTORequest = DTORequest;
