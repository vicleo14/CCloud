"use strict";
exports.__esModule = true;
var SHA256_1 = require("../src/app/classes/crypto/SHA256");
function test() {
    var sha256 = new SHA256_1.SHA256();
    var mensaje = "Hola";
    var tao = sha256.calculateHash(mensaje);
    tao = "5jP0/Hm63qHcXblwzzl8gki6xHzDrPmRW6YLXXaw6I8=";
    console.log(sha256.compareHash(mensaje, tao));
}
test();
