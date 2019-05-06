//tsc test/TDAO_User.ts
//node test/TDAO_User.js 

import {IConnector} from "../src/app/classes/dataAccess/connector/IConnector"
import {MDBConnector} from "../src/app/classes/dataAccess/connector/MDBConnector"
import { DTOUser } from "../src/app/classes/dataAccess/dto/DTOUser";
import { MDBDAOUser } from "../src/app/classes/dataAccess/dao/MDBDAOUser";
import { IDAOUser } from "../src/app/classes/dataAccess/dao/IDAOUser";

export class TDAO_User
{
    constructor()
    {
    }
    public main():void{
        console.log("Hola");

       
        var contacts:string[]=["prueba@correo.com"];
        console.log(contacts[0]);
        var user:DTOUser=new DTOUser();
        //user.setCurp("000000000000000000");
        //user.setName("Prueba");
        //user.setLastNameA("Prueba");
        //user.setLastNameB("Prueba");
        user.setNickname("prueba1");
        //user.setBirthday(new Date());
        //user.setRole(1);
        //user.setHashPassword("XXXXXXXX"); 
        //user.setActive(true);
        //user.setContacts(contacts);

        var daoUser:IDAOUser=new MDBDAOUser();
        var aux=daoUser.findUsers(user);

        
    }
}
var tdaouser:TDAO_User=new TDAO_User();
tdaouser.main();
