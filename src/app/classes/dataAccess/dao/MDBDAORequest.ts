import { IDAORequest } from "./IDAORequest";
import {DTORequest} from "../dto/DTORequest";
import * as pool from "../connector/Connection";
export class MDBDAORequest implements IDAORequest{

    async createRequest(request:DTORequest)
    {
        const result=await pool.query('CALL createRequest(?,?,?)',
        [request.getIdFile(),
        request.getIdKeyType(),
        request.getUser(),
        request.getCode()]);
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
        const result=await pool.query('CALL findRequestByUserFileType(?,?,?)',[nickname,idFile,type]);
        request.setIdFile(result[0][0].id_file);
        request.setIdKeyType(result[0][0].id_keyType);
        request.setUser(result[0][0].id_user);
        request.setState(result[0][0].nb_state);
        request.setCodeDate(result[0][0].tst_code);
        request.setCode(result[0][0].nb_code);
        return request;
    }

    async codeCheckout(code:number)
    {
        let request:DTORequest=new DTORequest();
        const result=await pool.query('CALL checkoutCode(?)',[code]);
        request.setIdFile(result[0][0].id_file);
        request.setIdKeyType(result[0][0].id_keyType);
        request.setUser(result[0][0].id_user);
        request.setState(result[0][0].nb_state);
        request.setCodeDate(result[0][0].tst_code);
        request.setCode(result[0][0].nb_code);
        return request;
    }

    async findRequestsByState(state:number){
        let requests:DTORequest[]=new Array();
        const result=await pool.query('CALL findRequestsByState(?)',[state]);
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
}