import { IDAOUser } from "./IDAOUser";
import { DTOUser } from "../dto/DTOUser";
import { MDBConnector } from "../connector/MDBConnector";

export class MDBDAOUser extends MDBConnector implements IDAOUser
{
    createUser(user: DTOUser): boolean
    {
        this.connect();
        var state:number;
        if(user.isActive())
        {
            state=1;
        }
        else
        {
            state=0;
        }
        console.log("Prueba MDBDAOUser",user.getContacts());
        var query = this.connection.query(
           'CALL signIn(?,?,?,?,?,?,?,?,?,?,?)',
            [user.getCurp(),
                user.getName(),
                user.getLastNameA(),
                user.getLastNameB(),
                user.getBirthday(),
                user.getRole(),
                user.getNickname(),
                user.getHashPassword(),
                state,
                user.getContacts()[0],
                0
            ], 
            function(error, result){
            if(error){
               throw error;
            }else{
               console.log(result);
            }
          }
         );
         this.close();
        return true;
    }
    findUsers(user: DTOUser): boolean
    {
        this.connect();
        var query = this.connection.query(
           'CALL findUser(?)',[ user.getNickname()], 
            function(error, result){
            if(error){
               throw error;
            }else{
                user.setName(result[0][0].tx_name);
                console.log(user.getName())
                user.setHashPassword(result[0][0].tx_hash_password);
                user.setActive(result[0][0].bl_state);
                user.setCurp(result[0][0].tx_curp);
                user.setLastNameA(result[0][0].tx_lastname_a);
                user.setLastNameB(result[0][0].tx_lastname_b);
                user.setBirthday(result[0][0].dt_birthday);
                user.setRole(result[0][0].id_role);
            }
          }
         );
         this.close();
        return true;
    }
    updateUser(user: DTOUser): boolean
    {
        return true;
    }
    deleteUser(user: DTOUser): boolean
    {
        return true;
    }
}