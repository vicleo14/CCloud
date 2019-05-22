
import * as nodemailer from "nodemailer";
export class Mail
{
    private createTransport;
    private oConfig;
    constructor()
    {
        this.oConfig={
            host: "smtp.gmail.com",
            auth: {
              type: "login", // default
              user: "ccloud.crypto@gmail.com",
              pass: "ccloudEscom"
            }
        }
        this.createTransport =nodemailer.createTransport(this.oConfig);
    }


    public sendWelcome(emailDestino:string,user:string)
    {
        var oEmail={
            from:"contacto@ccloud.com.mx",
            to:emailDestino,
            subject:"Welcome to CCloud",
            html:"<div>Hi <b>"+user+"</b></div>,<br />"+
                "Thanks for register on CCloud. For us is very important to provide you a secure place to upload your files."+
                " Since now you can begin to upload new files. <br />"+
                "<b><i>CCloud platform.</i></b>"
        }
        try{
            this.createTransport.sendMail(oEmail,function(error,info)
            {
                if(error)
                    console.log("Error al enviar correo",error);
                else
                    console.log("Correo enviado");
                //this.createTransport.close();
            });
        }
        catch(x)
        {

        }
        finally
        {
            console.log("Termina prueba");
        }
    }
    public notifyKeyChanged(emailDestino:string,user:string,fileName:string)
    {
        var oEmail={
            from:"contacto@ccloud.com.mx",
            to:emailDestino,
            subject:"Key compromissed for "+fileName+" document",
            html:"<div>Hi <b>"+user+"</b></div>,<br />"+
                "We have received a warning telling us that the key of \""+fileName+"\"  is compromissed."+
                " For us the security is very important and for that we have changed the key for a new one. "+
                "For get this new key please begin the request process in our page. <br />"+
                "<b><i>CCloud platform.</i></b>"
        }
        try{
            this.createTransport.sendMail(oEmail,function(error,info)
            {
                if(error)
                    console.log("Error al enviar correo",error);
                else
                    console.log("Correo enviado");
                //this.createTransport.close();
            });
        }
        catch(x)
        {

        }
        finally
        {
            console.log("Termina prueba");
        }
    }
    public sendRequestNumber(emailDestino:string,user:string,fileName:string,num:number)
    {
        var oEmail={
            from:"contacto@ccloud.com.mx",
            to:emailDestino,
            subject:"Key request for "+fileName+" document",
            html:"<div>Hi <b>"+user+"</b></div>,<br\>"+
                "We have received your request to  get the key of \""+fileName+"\"."+
                " For us the security is very important and for that we have generated a new personal code  for assure us you that you were who generated this request."+
                " For continue with your request please give us this code on the platform through your account.<br />"+
                "<b>Your personal code is:"+num+"</b><br />"+
                "<b><i>CCloud platform.</i></b>"
        }
        try{
            this.createTransport.sendMail(oEmail,function(error,info)
            {
                if(error)
                    console.log("Error al enviar correo",error);
                else
                    console.log("Correo enviado");
                //this.createTransport.close();
            });
        }
        catch(x)
        {

        }
        finally
        {
            console.log("Termina prueba");
        }
    }
}