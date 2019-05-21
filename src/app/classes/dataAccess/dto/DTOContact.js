"use strict";
exports.__esModule = true;
var DTOContact = /** @class */ (function () {
    function DTOContact() {
    }
    /*GETTERS*/
    DTOContact.prototype.getContact = function () {
        return this.contact;
    };
    DTOContact.prototype.getType = function () {
        return this.type;
    };
    /*SETTERS*/
    DTOContact.prototype.setContact = function (contact) {
        this.contact = contact;
    };
    DTOContact.prototype.setContatType = function (type) {
        this.type = type;
    };
    return DTOContact;
}());
exports.DTOContact = DTOContact;
