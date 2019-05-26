import { DTOKey } from "../dto/DTOKey";

export interface IDAOKey
{
    createKey(key:DTOKey):any;
    deleteKey(idFile:any,idType:number):any;
    updateKey(key:DTOKey):any;
    findKeysByFileId(idFile:any):any;
    findKeyByFileIdAndType(idFile:any,idType:number):any;
    shareKey(idFile:string, user:string):any;
}