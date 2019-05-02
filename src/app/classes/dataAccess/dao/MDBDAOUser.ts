import { IDAOUuser } from "./IDAOUser";

export class MDBDAOUser implements IDAOUuser
{
    createUser(): boolean
    {
        return true;
    }
    findUsers(): boolean
    {
        return true;
    }
    dropUser(): boolean
    {
        return true;
    }
    deleteUser(): boolean
    {
        return true;
    }
}