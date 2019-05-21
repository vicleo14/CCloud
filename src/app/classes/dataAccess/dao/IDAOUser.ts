import { DTOUser } from "../dto/DTOUser";
export interface IDAOUser
{
    createUser(user: DTOUser):any;
    findUsers(userNickname: string):any;
    updateUser(user: DTOUser):any;
    deleteUser(userNickname: string):any;
    updatePassword(nickname: string, hashPassword:string):any;
    lockUser(nickname:string):any;
}