"use strict";
exports.__esModule = true;
var fs = require("fs");
var FSDAOFileData = /** @class */ (function () {
    function FSDAOFileData() {
    }
    FSDAOFileData.prototype.createFile = function (path, name, data) {
        fs.writeFileSync(path + name, data);
    };
    FSDAOFileData.prototype.deleteFile = function (path, name) {
        fs.unlinkSync(path + name);
    };
    FSDAOFileData.prototype.readFile = function (path, name) {
        return fs.readFileSync(path + name);
    };
    return FSDAOFileData;
}());
exports.FSDAOFileData = FSDAOFileData;
