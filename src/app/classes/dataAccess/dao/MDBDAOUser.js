"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var MDBConnector_1 = require("../connector/MDBConnector");
var MDBDAOUser = /** @class */ (function (_super) {
    __extends(MDBDAOUser, _super);
    function MDBDAOUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDBDAOUser.prototype.createUser = function (user) {
        this.connect();
        var state;
        if (user.isActive()) {
            state = 1;
        }
        else {
            state = 0;
        }
        console.log("Prueba MDBDAOUser", user.getContacts());
        var query = this.connection.query('CALL signIn(?,?,?,?,?,?,?,?,?,?,?)', [user.getCurp(),
            user.getName(),
            user.getLastNameA(),
            user.getLastNameB(),
            user.getBirthday(),
            user.getRole(),
            user.getNickname(),
            user.getHashPassword(),
            state,
            user.getContacts()[0],
            0
        ], function (error, result) {
            if (error) {
                throw error;
            }
            else {
                console.log(result);
            }
        });
        this.close();
        return true;
    };
    MDBDAOUser.prototype.findUsers = function (user) {
        this.connect();
        var query = this.connection.query('CALL findUser(?)', [user.getNickname()], function (error, result) {
            if (error) {
                throw error;
            }
            else {
                user.setName(result[0][0].tx_name);
                console.log(user.getName());
                user.setHashPassword(result[0][0].tx_hash_password);
                user.setActive(result[0][0].bl_state);
                user.setCurp(result[0][0].tx_curp);
                user.setLastNameA(result[0][0].tx_lastname_a);
                user.setLastNameB(result[0][0].tx_lastname_b);
                user.setBirthday(result[0][0].dt_birthday);
                user.setRole(result[0][0].id_role);
            }
        });
        this.close();
        return true;
    };
    MDBDAOUser.prototype.updateUser = function (user) {
        return true;
    };
    MDBDAOUser.prototype.deleteUser = function (user) {
        return true;
    };
    return MDBDAOUser;
}(MDBConnector_1.MDBConnector));
exports.MDBDAOUser = MDBDAOUser;
