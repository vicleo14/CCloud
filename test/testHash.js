"use strict";
exports.__esModule = true;
var SHA256_1 = require("../src/app/classes/crypto/SHA256");
function test() {
    var sha256 = new SHA256_1.SHA256();
    var mensaje = "admin";
    var tao = sha256.calculateHash(mensaje);
    console.log(tao);
    console.log(sha256.compareHash(mensaje, tao));
}
test();
