"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var RandomGenerator_1 = require("./RandomGenerator");
var CryptoConstants_1 = require("../utils/CryptoConstants");
var AES256 = /** @class */ (function () {
    function AES256() {
        this.ALGORITHM = 'aes-256-cbc';
        this.OPERATION = "cbc";
        this.ivGenerator = new RandomGenerator_1.RandomGenerator();
    }
    AES256.prototype.cipher = function (data, key) {
        var iv = this.ivGenerator.generateRandom(CryptoConstants_1.CryptoConstants.AES_IVSIZE_BYTES);
        var cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);
        var encrypted = cipher.update(data, 'base64', 'base64');
        encrypted += cipher.final('base64');
        console.log("IV", iv);
        return encrypted + iv;
    };
    AES256.prototype.decipher = function (data, key) {
        var iv = data.substr(data.length - CryptoConstants_1.CryptoConstants.AES_IVSIZE_BYTES);
        data = data.substr(0, data.length - CryptoConstants_1.CryptoConstants.AES_IVSIZE_BYTES);
        var decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
        var decrypted = decipher.update(data, 'base64', 'base64');
        decrypted += decipher.final('base64');
        return decrypted;
    };
    AES256.prototype.cipherFile = function (data, key) {
        var iv = this.ivGenerator.generateRandom(CryptoConstants_1.CryptoConstants.AES_IVSIZE_BYTES);
        var buf_iv = Buffer.from(iv);
        var cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);
        var buf_d = cipher.update(data);
        var buf_d2 = cipher.final();
        var totLength = buf_d.length + buf_d2.length + buf_iv.length;
        var encrypted = Buffer.concat([buf_iv, buf_d, buf_d2], totLength);
        return encrypted;
    };
    AES256.prototype.decipherFile = function (data, key) {
        var buf_iv = Buffer.alloc(CryptoConstants_1.CryptoConstants.AES_IVSIZE_BYTES);
        data.copy(buf_iv, 0, 0, CryptoConstants_1.CryptoConstants.AES_IVSIZE_BYTES);
        var decipher = crypto.createDecipheriv(this.ALGORITHM, key, buf_iv);
        var content = Buffer.alloc(data.length - CryptoConstants_1.CryptoConstants.AES_IVSIZE_BYTES);
        data.copy(content, 0, CryptoConstants_1.CryptoConstants.AES_IVSIZE_BYTES, data.length);
        var buf_d = decipher.update(content);
        var buf_d2 = decipher.final();
        var totLength = buf_d.length + buf_d2.length;
        var decrypted = Buffer.concat([buf_d, buf_d2], totLength);
        return decrypted;
    };
    return AES256;
}());
exports.AES256 = AES256;
