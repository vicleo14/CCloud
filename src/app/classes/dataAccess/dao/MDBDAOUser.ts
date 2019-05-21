import { IDAOUser } from "./IDAOUser";
import { DTOUser } from "../dto/DTOUser";
import * as pool from "../connector/Connection"
export class MDBDAOUser implements IDAOUser
{
    async createUser(user: DTOUser)
    {
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
        if(result[0].length)/*REVISAR*/
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
            user=undefined;
        
        return user;
    }
    async updateUser(user: DTOUser)
    {
        const query = await pool.query(
           'CALL updateUser(?,?,?,?,?,?,?)',
            [   user.getName(),
                user.getLastNameA(),
                user.getLastNameB(),
                user.getBirthday(),
                user.getRole(),
                user.getNickname(),
                user.getHashPassword()
            ]);
        return true;
    }
    async deleteUser(userNickname: string)
    {
        const result=await pool.query('CALL deleteUser(?)',[userNickname]);
        console.log(result);
        return true;
    }
    async updatePassword(nickname: string, hashPassword:string)
    {
        const query = await pool.query(
            'CALL updatePassword(?,?)',
             [   
                 nickname,
                 hashPassword
             ]);
         return true;
    }
    async lockUser(nickname:string)
    {
        const query = await pool.query(
            'CALL lockUser(?)',
             [   
                 nickname
             ]);
         return true;
    }
}