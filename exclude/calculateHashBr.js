"use strict";
exports.__esModule = true;
var ExtensionConstants_1 = require("../src/app/classes/utils/ExtensionConstants");
var SHA256_1 = require("../src/app/classes/crypto/SHA256");
var name1 = "cipheredData" + ExtensionConstants_1.ExtensionConstants.GENERIC_EXTENSION;
var name2 = "key" + ExtensionConstants_1.ExtensionConstants.CIPHERKEYD_EXTENSION;
var name3 = "mac" + ExtensionConstants_1.ExtensionConstants.MACKEYD_EXTENSION;
var namep = "can.mp3";
var pathP = "../";
function sendForm() {
    var hash = new SHA256_1.SHA256();
    /* Obtenemos campos */
    var p1 = document.getElementById("p").value;
    var p2 = document.getElementById("rp").value;
    if (p1 == p2) {
        var phash = hash.calculateHash(p1);
        p1.value = phash;
        p2.value = phash;
    }
    else {
        alert("Las contraseñas no coinciden");
    }
}
