export interface IDAORequest
{
    createRequest();
    deleteRequest();
    updateRequest();
    findRequestByUser();
    findRequestByUserAndFile();
}