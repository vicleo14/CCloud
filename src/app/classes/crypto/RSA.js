"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var RSA = /** @class */ (function () {
    function RSA() {
    }
    RSA.prototype.publicEncryption = function (publicKey, message) {
        var pub_enc = crypto.publicEncrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING
        }, Buffer.from(message, "base64"));
        var pubencS = pub_enc.toString("base64");
        return pubencS;
    };
    RSA.prototype.publicDecryption = function (publicKey, message) {
        var pub_dec = crypto.publicDecrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING
        }, Buffer.from(message, "base64"));
        var pubedecS = pub_dec.toString("base64");
        return pubedecS;
    };
    RSA.prototype.privateEncryption = function (privateKey, message, cipherPhrase) {
        var priv_enc = crypto.privateEncrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
            passphrase: cipherPhrase
        }, Buffer.from(message, "base64"));
        var privedecS = priv_enc.toString("base64");
        return privedecS;
    };
    RSA.prototype.privateDecryption = function (privateKey, message, cipherPhrase) {
        var priv_dec = crypto.privateDecrypt({
            key: privateKey,
            passphrase: cipherPhrase,
            padding: crypto.constants.RSA_PKCS1_PADDING
        }, Buffer.from(message, "base64"));
        var privdecS = priv_dec.toString("base64");
        return privdecS;
    };
    return RSA;
}());
exports.RSA = RSA;
