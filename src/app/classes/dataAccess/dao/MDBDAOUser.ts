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
        console.log(user.getContacts()[0]);
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
               console.log(result[0].id_role);
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