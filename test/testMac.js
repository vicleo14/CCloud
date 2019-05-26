"use strict";
exports.__esModule = true;
var HMac_1 = require("../src/app/classes/crypto/HMac");
function test() {
    var mac = new HMac_1.HMac();
    var mensaje = "Hola";
    var llave = "llave";
    var tao = mac.calculateMac(mensaje, llave);
    console.log(tao);
    tao = "lLSdPPLhLjt6Pv943wv4PygNUxus6Ce9z2qwO8l0kuM=";
    console.log(mac.verifyMac(mensaje, llave, tao));
}
test();
