import { IDAOFileData } from "./IDAOFileData";
import * as fs from "fs";
export class FSDAOFileData implements IDAOFileData{
    createFile(path:string,name:string,data:Buffer)
    {
        fs.writeFileSync(path+name,data,'utf8');
    }
    deleteFile(path:string,name:string)
    {
        fs.unlinkSync(path+name);
    }
    readFile(path:string,name:string):Buffer
    {
        return fs.readFileSync(path+name);
    }
}