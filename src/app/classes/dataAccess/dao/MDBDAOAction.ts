import { IDAOAction } from "./IDAOAction";
import {DTOAction} from "../dto/DTOAction"
import * as pool from "../connector/Connection"
export class MDBDAOAction implements IDAOAction{
    
    async createAction(nickname:string,type:number)
    {
        const query = await pool.query(
            'CALL createAction(?,?)',[nickname,type]);
        return ;
    }
    async findActionsByUser(nickname:string)
    {
        let actions:DTOAction[]=new Array();
        const query = await pool.query(
            'CALL findActionsByUser(?)',[nickname]);
        for(var i=0;i<query[0].length;i++)
        {
            var aux:DTOAction=new DTOAction();
            aux.setAction(query[0][i].id_type);
            aux.setDate(query[0][i].tst_action);
            aux.setDescription(query[0][i].tx_description);
            actions.push(aux); 
        }
        return actions;
    }
    async findActionsByType(type:number)
    {
        let actions:DTOAction[]=new Array();
        const query = await pool.query(
            'CALL findActionsByType(?)',[type]);
        for(var i=0;i<query[0].length;i++)
        {
            var aux:DTOAction=new DTOAction();
            aux.setAction(query[0][i].id_type);
            aux.setDate(query[0][i].tst_action);
            aux.setDescription(query[0][i].tx_description);
            actions.push(aux); 
        }
        return actions;
    }
    async deleteActionsByUser(nickname:string)
    {
        const query = await pool.query(
            'CALL deleteActions(?)',[nickname]);
        return ;
    }
}