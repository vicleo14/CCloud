import { DTOUser } from "../dto/DTOUser";
export interface IDAOUser
{
    createUser(user: DTOUser):any;
    findUsers(userNickname: string):Promise<DTOUser>;
    updateUser(user: DTOUser):any;
    deleteUser(user: DTOUser):any;
}