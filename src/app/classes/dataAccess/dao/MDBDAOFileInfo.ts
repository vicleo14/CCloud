import { IDAOFileInfo } from "./IDAOFileInfo";
import { DTOFileInfo } from "../dto/DTOFileInfo";
import * as pool from "../connector/Connection"
export class MDBDAOFileInfo implements IDAOFileInfo
{
    async createFile(nickname:string,fileInfo:DTOFileInfo)
    {
        const result=await pool.query('CALL createFile(?,?,?,?,?,?)',
        [nickname,
        fileInfo.getId(),
        fileInfo.getCipheredName(),
        fileInfo.getDecipheredName(),
        fileInfo.getMAC(),
        fileInfo.getSize()
        ]);
    }
    async updateFile(fileInfo:DTOFileInfo)
    {
        const result=await pool.query('CALL updateFile(?,?,?,?,?)',
        [fileInfo.getId(),
        fileInfo.getCipheredName(),
        fileInfo.getDecipheredName(),
        fileInfo.getMAC(),
        fileInfo.getSize()
        ]);
    }
    async deleteFile(idFile:string)
    {
        const result=await pool.query('CALL deleteFile(?)',[idFile]);
    }
    async findFilesByUser(nickname:string)
    {
        let files:DTOFileInfo[]=new Array();
        const result=await pool.query('CALL findFilesByUser(?)',[nickname]);
        for(var i=0;i<result[0].length;i++)
        {
            var aux:DTOFileInfo=new DTOFileInfo();
            aux.setId(result[0][i].id_file);
            aux.setCipheredName(result[0][i].tx_ciphered_name);
            aux.setDecipheredName(result[0][i].tx_deciphered_name);
            aux.setMAC(result[0][i].tx_mac);
            aux.setSize(result[0][i].nb_size);
            aux.setDate(result[0][i].dt_update);
            files.push(aux); 
        }
        return files;
    }
    async findFileById(idFile:string)
    {
        let files:DTOFileInfo[]=new Array();
        const result=await pool.query('CALL findFileById(?)',[idFile]);
        for(var i=0;i<result[0].length;i++)
        {
            var aux:DTOFileInfo=new DTOFileInfo();
            aux.setId(result[0][i].id_file);
            aux.setCipheredName(result[0][i].tx_ciphered_name);
            aux.setDecipheredName(result[0][i].tx_deciphered_name);
            aux.setMAC(result[0][i].tx_mac);
            aux.setSize(result[0][i].nb_size);
            aux.setDate(result[0][i].dt_update);
            files.push(aux); 
        }
        return files;
    }
    async shareFile(nickname:string,idFile:string)
    {
        const result=await pool.query('CALL shareFile(?,?)',[nickname,idFile]);
    }

    async unshareFile(nickname:string,idFile:string)
    {
        const result=await pool.query('CALL unshareFile(?,?)',[nickname,idFile]);
    }
    async findUsers(idFile:string)
    {
        let users:string[]=new Array();
        const result=await pool.query('CALL findUsersOfFile(?)',[idFile]);
        for(var i=0;i<result[0].length;i++)
        {
            users.push(result[0][i].id_user);
        }
        return users;
    }


}