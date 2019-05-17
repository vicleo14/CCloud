//tsc test/testUser.ts
//node test/testUser.js 
import { DTOUser } from "../src/app/classes/dataAccess/dto/DTOUser";
import { MDBDAOUser } from "../src/app/classes/dataAccess/dao/MDBDAOUser";
import { IDAOUser } from "../src/app/classes/dataAccess/dao/IDAOUser";


async function main()
{
    console.log("Pruebas de DAO para User:");

        var user:DTOUser=new DTOUser();
        var daoUser:IDAOUser=new MDBDAOUser();
       /*Agregar un usuario con DAO*/
        
        user.setCurp("MOFV980614HDFRLC00");
        user.setName("Leonel");
        user.setLastNameA("Morales");
        user.setLastNameB("Flores");
        user.setNickname("vicleo14");
        user.setBirthday(new Date());
        user.setRole(0);
        user.setHashPassword("prueba"); 
        user.setActive(true);
        await daoUser.createUser(user);
        
        /*Modificar usuario */
        user.setName("Victor");
        user.setRole(1);
        await daoUser.updateUser(user);


        /*Update password */
        daoUser.updatePassword("vicleo14","jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=");
        
        
        /*Buscar usuario con DAO*/
        /*
        user= await daoUser.findUsers("vicleo14");
        console.log(user.getName());
        console.log(user.getLastNameA());
        console.log(user.getLastNameB());
        console.log(user.getBirthday());
        console.log(user.getRole());*/
        
        /*Bloquer usuario*/
        /*await daoUser.lockUser("vicleo14");*/


        /*Delete user*/
        /*await daoUser.deleteUser("vicleo14");*/
        console.log("Termina opearcion");
}

main()