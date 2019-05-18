import { IDAOKey } from "../src/app/classes/dataAccess/dao/IDAOKey";
import { MDBDAOKey } from "../src/app/classes/dataAccess/dao/MDBDAOKey";
import {DTOKey} from "../src/app/classes/dataAccess/dto/DTOKey";
import {KeyConstants} from "../src/app/classes/utils/KeyConstants"
async function main()
{
    var dtoKey:DTOKey=new DTOKey();
    const daoKey:IDAOKey=new MDBDAOKey();
    console.log("Comienza pruebas de DAO key");
    dtoKey.setIdFile("bbbbbbbbbb");
    dtoKey.setIdType(KeyConstants.KEY_INTEGRITY);
    dtoKey.setKeyFileName("alo.dcr");
    dtoKey.setKeyHash("idjkamd");
    /* CREAR LLAVE EN BD */
    /*
    await daoKey.createKey(dtoKey);
    */

    /* ACTUALIZAR LLAVE */
    /*
    dtoKey.setKeyHash("noesuhashxD");
    await daoKey.updateKey(dtoKey);
    */
   /* Buscar por archivo */
   /*
   var resutls=await daoKey.findKeysByFileId("bbbbbbbbbb");
   console.log(resutls);
   */
   /* Buscar por archivo i id */
   var resutls2=await daoKey.findKeyByFileIdAndType("bbbbbbbbbb",KeyConstants.KEY_CIPHER_DECIPHER);
   console.log(resutls2);
}
main();