export interface IDAOKey
{
    createKey():any;
    deleteKey():any;
    updateKey():any;
    findKeysByFileId(idFile:any):any;
    findKeyByFileIdAndType(idFile:any):any;
}