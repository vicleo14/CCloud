//tsc test/testUser.ts
//node test/testUser.js 

import {IConnector} from "../src/app/classes/dataAccess/connector/IConnector"
import {MDBConnector} from "../src/app/classes/dataAccess/connector/MDBConnector"
import { DTOUser } from "../src/app/classes/dataAccess/dto/DTOUser";
import { MDBDAOUser } from "../src/app/classes/dataAccess/dao/MDBDAOUser";
import { IDAOUser } from "../src/app/classes/dataAccess/dao/IDAOUser";


async function main()
{
    console.log("Pruebas de DAO para User:");

       //Agregar un usuario con DAO
        /*var contacts:string[]=["prueba@correo.com"];
        var user:DTOUser=new DTOUser();
        user.setCurp("000000000000000111");
        user.setName("Prueba");
        user.setLastNameA("Prueba");
        user.setLastNameB("Prueba");
        user.setNickname("prueba1");
        user.setBirthday(new Date());
        user.setRole(1);
        user.setHashPassword("XXXXXXXX"); 
        user.setActive(true);
        user.setContacts(contacts);
        var daoUser:IDAOUser=new MDBDAOUser();
        var aux=daoUser.createUser(user);*/


        //Buscar usuario con DAO
        var daoUser2:IDAOUser=new MDBDAOUser();
        const aux= await daoUser2.findUsers("victor1");
        console.log(aux.getName());
        //console.log(user2.getLastNameA());
        //console.log(user2.getLastNameB());
        //console.log(user2.getBirthday());
        //console.log(user2.getRole());
        console.log("Termina opearcion");
}

main()