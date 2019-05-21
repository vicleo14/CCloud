import {DTOFileData} from "../dto/DTOFileData";

export interface IDAOFileData
{
    createFile(path:string, fileData: DTOFileData);
    deleteFile(path:string,name:string);
    readFile(path:string,name:string):Buffer;
}