"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var RSA = /** @class */ (function () {
    function RSA() {
    }
    RSA.prototype.publicEncryption = function (publicKey, message) {
        var buf = Buffer.from(message);
        console.log(buf.length);
        var pub_enc = crypto.publicEncrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING
        }, buf);
        return pub_enc;
    };
    RSA.prototype.publicDecryption = function (publicKey, message) {
        var pub_dec = crypto.publicDecrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING
        }, message);
        return pub_dec.toString();
    };
    RSA.prototype.privateEncryption = function (privateKey, message, cipherPhrase) {
        var buf = Buffer.from(message);
        var priv_enc = crypto.privateEncrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
            passphrase: cipherPhrase
        }, buf);
        return priv_enc;
    };
    RSA.prototype.privateDecryption = function (privateKey, message, cipherPhrase) {
        var priv_dec = crypto.privateDecrypt({
            key: privateKey,
            passphrase: cipherPhrase,
            padding: crypto.constants.RSA_PKCS1_PADDING
        }, message);
        return priv_dec.toString();
    };
    return RSA;
}());
exports.RSA = RSA;
