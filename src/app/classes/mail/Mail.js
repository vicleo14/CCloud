"use strict";
exports.__esModule = true;
var nodemailer = require("nodemailer");
var Mail = /** @class */ (function () {
    function Mail() {
        this.oConfig = {
            host: "smtp.gmail.com",
            auth: {
                type: "login",
                user: "@gmail.com",
                pass: ""
            }
        };
        this.createTransport = nodemailer.createTransport(this.oConfig);
    }
    Mail.prototype.sendWelcome = function (emailDestino, user) {
        var oEmail = {
            from: "contacto@ccloud.com.mx",
            to: emailDestino,
            subject: "Welcome to CCloud",
            html: "<div>Hi <b>" + user + "</b></div>,<br />" +
                "Thanks for register on CCloud. For us is very important to provide you a secure place to upload your files." +
                " Since now you can begin to upload new files. <br />" +
                "<b><i>CCloud platform.</i></b>"
        };
        try {
            this.createTransport.sendMail(oEmail, function (error, info) {
                if (error)
                    console.log("Error al enviar correo", error);
                else
                    console.log("Correo enviado");
                //this.createTransport.close();
            });
        }
        catch (x) {
        }
        finally {
            console.log("Termina prueba");
        }
    };
    Mail.prototype.notifyKeyChanged = function (emailDestino, user, fileName) {
        var oEmail = {
            from: "contacto@ccloud.com.mx",
            to: emailDestino,
            subject: "Key compromissed for " + fileName + " document",
            html: "<div>Hi <b>" + user + "</b></div>,<br />" +
                "We have received a warning telling us that the key of \"" + fileName + "\"  is compromissed." +
                " For us the security is very important and for that we have changed the key for a new one. " +
                "For get this new key please begin the request process in our page. <br />" +
                "<b><i>CCloud platform.</i></b>"
        };
        try {
            this.createTransport.sendMail(oEmail, function (error, info) {
                if (error)
                    console.log("Error al enviar correo", error);
                else
                    console.log("Correo enviado");
                //this.createTransport.close();
            });
        }
        catch (x) {
        }
        finally {
            console.log("Termina prueba");
        }
    };
    Mail.prototype.sendRequestNumber = function (emailDestino, user, fileName, num) {
        var oEmail = {
            from: "contacto@ccloud.com.mx",
            to: emailDestino,
            subject: "Key request for " + fileName + " document",
            html: "<div>Hi <b>" + user + "</b></div>,<br\>" +
                "We have received your request to  get the key of \"" + fileName + "\"." +
                " For us the security is very important and for that we have generated a new personal code  for assure us you that you were who generated this request." +
                " For continue with your request please give us this code on the platform through your account.<br />" +
                "<b>Your personal code is:" + num + "</b><br />" +
                "<b><i>CCloud platform.</i></b>"
        };
        try {
            this.createTransport.sendMail(oEmail, function (error, info) {
                if (error)
                    console.log("Error al enviar correo", error);
                else
                    console.log("Correo enviado");
                //this.createTransport.close();
            });
        }
        catch (x) {
        }
        finally {
            console.log("Termina prueba");
        }
    };
    return Mail;
}());
exports.Mail = Mail;
