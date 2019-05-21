import { IDAOFileData } from "./IDAOFileData";
import { DTOFileData } from "../dto/DTOFileData";
import * as fs from "fs";
export class FSDAOFileData implements IDAOFileData{
    createFile(path:string, fileData: DTOFileData)
    {
        fs.writeFileSync(path+fileData.getFileName(), fileData.getData());
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