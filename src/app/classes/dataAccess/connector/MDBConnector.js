"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var MDBConnector = /** @class */ (function () {
    function MDBConnector() {
        this.HOST = "localhost";
        this.DATABASE = "db_Ccloud";
        this.PORT = "3306";
        this.USER = "root";
        this.PASSWORD = "root";
    }
    MDBConnector.prototype.connect = function () {
        this.connection = mysql.createConnection({
            host: this.HOST,
            user: this.USER,
            password: this.PASSWORD,
            database: this.DATABASE
        });
        this.connection.connect(function (error) {
            if (error) {
                throw error;
            }
            else {
                console.log('Conexion correcta.');
            }
        });
    };
    MDBConnector.prototype.close = function () {
        this.connection.end();
        console.log('Conexion cerrada.');
    };
    MDBConnector.prototype.getConnection = function () {
        return this.connection;
    };
    return MDBConnector;
}());
exports.MDBConnector = MDBConnector;
