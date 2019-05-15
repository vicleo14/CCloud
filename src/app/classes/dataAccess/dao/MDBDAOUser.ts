import { IDAOUser } from "./IDAOUser";
import { DTOUser } from "../dto/DTOUser";
import { MDBConnector } from "../connector/MDBConnector";
import * as pool from "../connector/Connection"
export class MDBDAOUser extends MDBConnector implements IDAOUser
{
    async createUser(user: DTOUser)
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
        const query = await pool.query(
           'CALL signIn(?,?,?,?,?,?,?,?,?)',
            [user.getCurp(),
                user.getName(),
                user.getLastNameA(),
                user.getLastNameB(),
                user.getBirthday(),
                user.getRole(),
                user.getNickname(),
                user.getHashPassword(),
                state
            ]);
        return true;
    }
    async findUsers(userNickname: string)
    {

        var user:DTOUser=new DTOUser();
        const result=await pool.query('CALL findUser(?)',[userNickname]);
        if(result[0].length)
        {
            user.setName(result[0][0].tx_name);
            user.setHashPassword(result[0][0].tx_hash_password);
            user.setActive(result[0][0].bl_state);
            user.setCurp(result[0][0].tx_curp);
            user.setLastNameA(result[0][0].tx_lastname_a);
            user.setLastNameB(result[0][0].tx_lastname_b);
            user.setBirthday(result[0][0].dt_birthday);
            user.setRole(result[0][0].id_role);
        }
        else
            throw "Usuario no encontrado."
        
        return user;
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