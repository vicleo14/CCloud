import {DTORequest} from "../dto/DTORequest"
export interface IDAORequest
{
    createRequest(request:DTORequest);
    deleteRequest(request:DTORequest);
    updateRequest(request:DTORequest);
    findRequestByUser(nickname:string);
    findRequestByUserAndFile(nickname:string,idFile:string);
    findRequestByUserFileAndType(nickname:string,idFile:string,type:number);
    codeCheckout(code:number);
    findRequestsByState(state:number);
}