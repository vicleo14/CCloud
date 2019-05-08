"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var SHA256 = /** @class */ (function () {
    function SHA256() {
    }
    SHA256.prototype.calculateHash = function (message) {
        var tao;
        var hash = crypto.createHash('sha256');
        hash.update(message);
        tao = hash.digest('base64');
        return tao;
    };
    SHA256.prototype.compareHash = function (message, hash) {
        var taop = this.calculateHash(message);
        return (taop === hash) ? true : false;
    };
    return SHA256;
}());
exports.SHA256 = SHA256;
