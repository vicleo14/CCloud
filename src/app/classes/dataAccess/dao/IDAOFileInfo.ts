import {DTOFileInfo} from "../dto/DTOFileInfo"
export interface IDAOFileInfo
{
    createFile(nickname:string,fileInfo:DTOFileInfo):any;
    updateFile(fileInfo:DTOFileInfo):any;
    deleteFile(idFile:string):any;
    findFilesByUser(nickname:string):any;
    findFileById(idFile:string):any;
    shareFile(nickname:string,idFile:string):any;
    unshareFile(nickname:string,idFile:string):any;
    findUsers(idFile:string):any;
}