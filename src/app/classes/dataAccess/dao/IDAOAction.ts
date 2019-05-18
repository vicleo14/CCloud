export interface IDAOAction
{
    createAction(nickname:string,type:number):any;
    findActionsByUser(nickname:string):any;
    findActionsByType(type:number):any;
    deleteActionsByUser(nickname:string):any;
}