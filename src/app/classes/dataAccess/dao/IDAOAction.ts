export interface IDAOAction
{
    createAction():any;
    findActionsByUser();
    findActionsByType();
    deleteActionsByUser();
}