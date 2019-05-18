import { IDAOKey } from "./IDAOKey";
import {DTOKey} from "../dto/DTOKey";
import * as pool from "../connector/Connection";
export class MDBDAOKey implements IDAOKey
{
    async createKey(key:DTOKey)
    {
        const result=await pool.query('CALL createKey(?,?,?,?)',
        [key.getIdFile(),
        key.getIdType(),
        key.getKeyFileName(),
        key.getKeyHash()]);
    }
    async deleteKey(idFile:any,idType:number)
    {
        const result=await pool.query('CALL deleteKey(?,?)',[idFile,idType]);
    }

    async updateKey(key:DTOKey)
    {
        const result=await pool.query('CALL updateKey(?,?,?,?)',
        [key.getIdFile(),
        key.getIdType(),
        key.getKeyFileName(),
        key.getKeyHash()]);
    }

    async findKeysByFileId(idFile:any)
    {
        let keys:DTOKey[]=new Array();
        const result=await pool.query('CALL findKeysByFile(?)',[idFile]);
        for(var i=0;i<result[0].length;i++)
        {
            var aux:DTOKey=new DTOKey();
            aux.setIdFile(result[0][i].id_file);
            aux.setIdType(result[0][i].id_type);
            aux.setKeyFileName(result[0][i].tx_key_name);
            aux.setKeyHash(result[0][i].tx_hash);
            keys.push(aux);
        }
        return keys;
    }
    async findKeyByFileIdAndType(idFile:any,idType:number)
    {
        let key:DTOKey=new DTOKey();
        const result=await pool.query('CALL findKeyByFileType(?,?)',[idFile,idType]);
        key.setIdFile(result[0][0].id_file);
        key.setIdType(result[0][0].id_type);
        key.setKeyFileName(result[0][0].tx_key_name);
        key.setKeyHash(result[0][0].tx_hash);
        return key;
    }


}