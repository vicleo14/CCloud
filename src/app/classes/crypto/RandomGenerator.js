"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var RandomGenerator = /** @class */ (function () {
    function RandomGenerator() {
    }
    RandomGenerator.prototype.generateRandom = function (size) {
        var buf = crypto.randomBytes(size);
        var key = buf.toString('base64').substr(0, size);
        return key;
    };
    return RandomGenerator;
}());
exports.RandomGenerator = RandomGenerator;
