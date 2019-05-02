"use strict";
exports.__esModule = true;
var MDBConnector_1 = require("../src/app/classes/dataAccess/connector/MDBConnector");
var TDAO_User = /** @class */ (function () {
    function TDAO_User() {
    }
    TDAO_User.prototype.main = function () {
        console.log("Hola");
        var connector;
        connector = new MDBConnector_1.MDBConnector();
        connector.connect();
        var query = connector.getConnection().query(
        //'INSERT INTO personaje(nombre, apellido, biografia) VALUES(?, ?, ?)', 
        'SELECT * FROM keyType', ['Homero', 'Simpson', 'Esposo de Marge y padre de Bart, Lisa y Maggie.'], function (error, result) {
            if (error) {
                throw error;
            }
            else {
                console.log(result);
                connector.close();
            }
        });
    };
    return TDAO_User;
}());
exports.TDAO_User = TDAO_User;
var tdaouser = new TDAO_User();
tdaouser.main();
