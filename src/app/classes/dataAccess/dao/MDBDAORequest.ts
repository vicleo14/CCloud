import { IDAORequest } from "./IDAORequest";
import {DTORequest} from "../dto/DTORequest";
import * as pool from "../connector/Connection";
export class MDBDAORequest implements IDAORequest{

    async createRequest(request:DTORequest)
    {
        var success:boolean=false;
        //console.log(request);
        try{
            const result=await pool.query('CALL createRequest(?,?,?)',
            [request.getIdFile(),
            request.getIdKeyType(),
            request.getUser()]);
            success=true;
        }
        catch(x)
        {
            console.log("Error en DAO REQUEST");
            success=false;
        }
        finally{
            return success;
        }
        
    }
    async deleteRequest(request:DTORequest)
    {

    }
    async updateRequest(request:DTORequest)
    {
        const result=await pool.query('CALL updateRequest(?,?,?,?,?)',
        [request.getIdFile(),
        request.getIdKeyType(),
        request.getUser(),
        request.getState(),
        request.getCode()]);
    }
    async findRequestByUser(nickname:string)
    {
        let requests:DTORequest[]=new Array();
        const result=await pool.query('CALL findRequestsByUser(?)',[nickname]);
        for(var i=0;i<result[0].length;i++)
        {
            var aux:DTORequest=new DTORequest();
            aux.setIdFile(result[0][i].id_file);
            aux.setIdKeyType(result[0][i].id_keyType);
            aux.setUser(result[0][i].id_user);
            aux.setState(result[0][i].nb_state);
            aux.setCodeDate(result[0][i].tst_code);
            aux.setCode(result[0][i].nb_code);
            requests.push(aux);
        }
        return requests;
    }
    async findRequestByUserAndFile(nickname:string,idFile:string)
    {
        let requests:DTORequest[]=new Array();
        const result=await pool.query('CALL findRequestByUserAndFile(?,?)',[nickname,idFile]);
        for(var i=0;i<result[0].length;i++)
        {
            var aux:DTORequest=new DTORequest();
            aux.setIdFile(result[0][i].id_file);
            aux.setIdKeyType(result[0][i].id_keyType);
            aux.setUser(result[0][i].id_user);
            aux.setState(result[0][i].nb_state);
            aux.setCodeDate(result[0][i].tst_code);
            aux.setCode(result[0][i].nb_code);
            requests.push(aux);
        }
        return requests;
    }
    async findRequestByUserFileAndType(nickname:string,idFile:string,type:number)
    {
        let request:DTORequest=new DTORequest();
        console.log(nickname+" "+ idFile+" "+type+" ");
        try
        {
            const result=await pool.query('CALL findRequestByUserFileType(?,?,?)',[nickname,idFile,type]);
            if(result[0].length>0)
            {
                request.setIdFile(result[0][0].id_file);
                request.setIdKeyType(result[0][0].id_keyType);
                request.setUser(result[0][0].id_user);
                request.setState(result[0][0].nb_state);
                request.setCodeDate(result[0][0].tst_code);
                request.setCode(result[0][0].nb_code);
            }
            else
            {
                request=null;
            }
            
        }
        catch(x)
        {
            console.log("ERROR EN DAOREQUEST:",x);
            request=null;
        }
        finally
        {
            return request;
        }   
    }


}