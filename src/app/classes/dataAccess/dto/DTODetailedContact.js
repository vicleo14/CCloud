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
        return this.description;
    };
    /*SETTERS*/
    DTODetailedContact.prototype.setContact = function (contact) {
        this.contact = contact;
    };
    DTODetailedContact.prototype.setType = function (type) {
        this.type = type;
    };
    DTODetailedContact.prototype.setDescription = function (description) {
        this.description = description;
    };
    return DTODetailedContact;
}());
exports.DTODetailedContact = DTODetailedContact;
