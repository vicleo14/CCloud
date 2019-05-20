import { IDAOFileData } from "./IDAOFileData";
import * as fs from "fs";
export class FSDAOFileData implements IDAOFileData{
    createFile(path:string,name:string,data:any)
    {
        fs.writeFileSync(path+name,data,);
    }
    deleteFile(path:string,name:string)
    {
        fs.unlinkSync(path+name);
    }
    readFile(path:string,name:string):Buffer
    {
        return fs.readFileSync(path+name,);
    }
}