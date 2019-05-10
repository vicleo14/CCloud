"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var Mac = /** @class */ (function () {
    function Mac() {
    }
    Mac.prototype.calculateMac = function (message, key) {
        var tag;
        var hmac = crypto.createHmac('sha256', key);
        hmac.update(message);
        tag = hmac.digest('base64');
        return tag;
    };
    Mac.prototype.verifyMac = function (message, key, tag) {
        var tag_p = this.calculateMac(message, key);
        return (tag === tag_p) ? true : false;
    };
    return Mac;
}());
exports.Mac = Mac;
