import { DTOUser } from "../dto/DTOUser";
export interface IDAOUser
{
    createUser(user: DTOUser):any;
    findUsers(user: DTOUser):any;
    updateUser(user: DTOUser):any;
    deleteUser(user: DTOUser):any;
}