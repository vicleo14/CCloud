"use strict";
exports.__esModule = true;
var DTODetailedContact = /** @class */ (function () {
    function DTODetailedContact() {
    }
    /*GETTERS*/
    DTODetailedContact.prototype.getContact = function () {
        return this.contact;
    };
    DTODetailedContact.prototype.getType = function () {
        return this.type;
    };
    DTODetailedContact.prototype.getDescription = function () {
        return this.descrpition;
    };
    /*SETTERS*/
    DTODetailedContact.prototype.setContact = function (contact) {
        this.contact = contact;
    };
    return DTODetailedContact;
}());
exports.DTODetailedContact = DTODetailedContact;
