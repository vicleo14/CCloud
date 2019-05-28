"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var HMac = /** @class */ (function () {
    function HMac() {
    }
    HMac.prototype.calculateMac = function (message, key) {
        var tag;
        var hmac = crypto.createHmac('sha256', key);
        hmac.update(message);
        tag = hmac.digest('base64');
        return tag;
    };
    HMac.prototype.verifyMac = function (message, key, tag) {
        var tagp = this.calculateMac(message, key);
        return (tag == tagp) ? true : false;
    };
    return HMac;
}());
exports.HMac = HMac;
