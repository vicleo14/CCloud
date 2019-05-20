export interface IDAOFileData
{
    createFile(path:string,name:string,data:any);
    deleteFile(path:string,name:string);
    readFile(path:string,name:string):Buffer;
}