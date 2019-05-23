"use strict";
exports.__esModule = true;
var crypto_1 = require("crypto");
var RSAKeyGenerator = /** @class */ (function () {
    function RSAKeyGenerator() {
    }
    RSAKeyGenerator.prototype.generateKeys = function (cipherPhrase) {
        var _a = crypto_1.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: cipherPhrase
            }
        }), publicKey = _a.publicKey, privateKey = _a.privateKey;
        var keys = [publicKey, privateKey];
        return keys;
    };
    return RSAKeyGenerator;
}());
exports.RSAKeyGenerator = RSAKeyGenerator;
