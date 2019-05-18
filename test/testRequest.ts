import { IDAORequest } from "../src/app/classes/dataAccess/dao/IDAORequest";
import { MDBDAORequest } from "../src/app/classes/dataAccess/dao/MDBDAORequest";
import { KeyConstants } from "../src/app/classes/utils/KeyConstants";
import { RequestConstants } from "../src/app/classes/utils/RequestConstants";
import {DTORequest} from "../src/app/classes/dataAccess/dto/DTORequest";

async function main()
{
    var dtoRequest:DTORequest=new DTORequest();
    const daoRequest:IDAORequest=new MDBDAORequest();
    console.log("Comienza test DAO Request");
    /* AGREGAR REQUEST */
    
    dtoRequest.setIdFile("bbbbbbbbbb");
    dtoRequest.setUser("victor1");
    dtoRequest.setIdKeyType(KeyConstants.KEY_INTEGRITY);
    await daoRequest.createRequest(dtoRequest);
    
    /*Encontrar request por usuario */
    /*
    var result:DTORequest[]=await daoRequest.findRequestByUser("victor1");
    console.log("result",result);
    */
    /* Actualizar Request */
    /*
    result[0].setCode(1234);
    result[0].setState(RequestConstants.REQUEST_CONFIRMED);
    daoRequest.updateRequest(result[0]);
    */
   /* ENCONTRAR KEY POR USUARIO Y ARCHIVO */
   console.log(await daoRequest.findRequestByUserAndFile("victor1","bbbbbbbbbb"));
   /* ENCONTRAR KEY POR USUARIO, ARCHIVO Y TIPO */
   console.log(await daoRequest.findRequestByUserFileAndType("victor1","bbbbbbbbbb",KeyConstants.KEY_CIPHER_DECIPHER));
}
main();