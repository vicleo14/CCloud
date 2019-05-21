import { DTOUser } from "../dataAccess/dto/DTOUser";
import { MDBDAOUser } from "../dataAccess/dao/MDBDAOUser";
import { IDAOUser } from "../dataAccess/dao/IDAOUser";

import { DTOAction } from "../dataAccess/dto/DTOAction";
import { IDAOAction } from "../dataAccess/dao/IDAOAction";
import { MDBDAOAction } from "../dataAccess/dao/MDBDAOAction";

import { DTOContact } from "../dataAccess/dto/DTOContact";
import { MDBDAOContact } from "../dataAccess/dao/MDBDAOContact";
import { IDAOContact } from "../dataAccess/dao/IDAOContact";

import {ContactConstants} from "../utils/ContactConstants";

import {Mail} from "../mail/Mail";

export class BUser
{   
    private loginTries:number;
    constructor(){
        this.loginTries = 0;
    }
    
    async createUser(curp:string, name:string, l_name_a:string, l_name_b:string, birth:Date, 
        role:number, nickn:string, pass:string, email:string)
    {
        const mailSender:Mail=new Mail();
        var dto_user:DTOUser = new DTOUser();
        var dto_action:DTOAction = new DTOAction();
        var dto_contact:DTOContact = new DTOContact();
        //Check if the nickname is already in use
        if(!dao_user.findUsers(nickn))
            return false;
        //If there's no othe user with the same nickname, continues the process
        dto_user.setCurp(curp);
        dto_user.setName(name);
        dto_user.setLastNameA(l_name_a);
        dto_user.setLastNameB(l_name_b);
        dto_user.setBirthday(birth);
        dto_user.setRole(role);
        dto_user.setNickname(nickn);
        dto_user.setHashPassword(pass);
        dto_user.setActive(true);
        //Verifies the array contactType is the same lenght as the array contact
        //if(contact.length != typeContact.length)
        //    return false;
        //Verifies if there is at least one email into the user contacts
        var band_email = false;
        let regexpEmail = new RegExp('/^((?!(@)).)*$/');
        /*for(let cont of contact){
            if(!regexpEmail){
                band_email = true;
                break;
            }
        }*/
        //If there's no email, returns false
        //if(!band_email)
        //   return false;
        //If there's an email, continues the user creation process
        var dao_user:IDAOUser = new MDBDAOUser();
        dao_user.createUser(dto_user);
        //Creation of the user contacts
        var dao_contact:IDAOContact = new MDBDAOContact();
        var cont=0;
        /*for(let cont of contact){
            dto_contact.setContact(cont);
            dto_contact.setContatType(typeContact[cont]);
            dao_contact.createContact(nickn, dto_contact);
            cont+=1;
        }*/
        dto_contact.setContact(email);
        dto_contact.setContatType(ContactConstants.CONTACT_EMAIL);
        await dao_contact.createContact(nickn,dto_contact);
        /* ENVIAMOS CORREO */
        mailSender.sendWelcome(email,nickn);
        //var dao_action:IDAOAction = new MDBDAOAction();
        //dto_action.setActions([1006, 1004]);
        
        //dao_action.createAction(dto_action);
        return true;
    }

    public userLogin(nickname:string, password:string){
/*        var dto_user:DTOUser = new DTOUser();
        var dto_action:DTOAction = new DTOAction();
        var dao_user:IDAOUser = new MDBDAOUser();
        var dao_action:IDAOAction = new MDBDAOAction();
        //Searches the user in the system
        dto_user = dao_user.findUsers(nickname);
        if(){
            //If the password is correct
            if(dto_user.getHashPassword() == password){
                dto_action.addAction(1001);
                dao_action.createAction(dto_action);   
                //Se sube un usuario a sesión
                return true;
            }
            //If it isn't
            else{
                dto_action.addAction(1002);
                this.loginTries++;
                //If it's users third try 
                if(this.loginTries == 3){
                    dto_user.setActive(false);
                    dao_user.updateUser(dto_user);
                    dto_action.setActions([1005, 1003]);
                    dao_action.createAction(dto_action);
                }
                return false;
            }   
        }
      else*/
            return false;
    }

    public userLogout(nickname:string):boolean{
        
        return ;
    }
}