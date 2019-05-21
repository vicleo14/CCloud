"use strict";
exports.__esModule = true;
var DTOAction = /** @class */ (function () {
    function DTOAction() {
    }
    /* SETTERS */
    /*public setUser(user:string)
    {
        this.user=user;
    }*/
    DTOAction.prototype.setAction = function (action) {
        this.action = action;
    };
    DTOAction.prototype.setDate = function (date) {
        this.date = date;
    };
    DTOAction.prototype.setDescription = function (description) {
        this.description = description;
    };
    /* GETTERS */
    /*public getUser()
    {
        return this.user;
    }*/
    DTOAction.prototype.getAction = function () {
        return this.action;
    };
    DTOAction.prototype.getDate = function () {
        return this.date;
    };
    DTOAction.prototype.getDescription = function () {
        return this.description;
    };
    return DTOAction;
}());
exports.DTOAction = DTOAction;
