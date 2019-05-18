import {DTOFileInfo} from "../src/app/classes/dataAccess/dto/DTOFileInfo";
import {IDAOFileInfo} from "../src/app/classes/dataAccess/dao/IDAOFileInfo";
import {MDBDAOFileInfo} from "../src/app/classes/dataAccess/dao/MDBDAOFileInfo";
async function main()
{
    console.log("Comienza prueba");
    var dtoFile:DTOFileInfo=new DTOFileInfo();
    const daoFile:IDAOFileInfo=new MDBDAOFileInfo();
    /* CREAR ARCHIVO */
    /*
    dtoFile.setId("bbbbbbbbbb");
    dtoFile.setCipheredName("holi.mnf");
    dtoFile.setDecipheredName("holi.jpg");
    dtoFile.setDate(new Date());
    dtoFile.setMAC("njsdnasdnjk");
    dtoFile.setSize(355);
    daoFile.createFile("victor1",dtoFile);
    */

    /* Encontrar archivo por usuario */
    /*
    var result:DTOFileInfo[]=await daoFile.findFilesByUser("victor1");
    console.log(result);
    */

    /* Encontrar archivo por id */
    /*
    var result:DTOFileInfo[]=await daoFile.findFileById("aaaaaaaaaa");
    console.log(result);
    */

    /* Eliminar archivo por id */
    /*
    await daoFile.unshareFile("victor1","aaaaaaaaaa");
    var result:DTOFileInfo[]=await daoFile.deleteFile("aaaaaaaaaa");
    */
    /* Compartir archivo */
    /*
    await daoFile.shareFile("memo1","bbbbbbbbbb");
    */
    /* Obtener usuarios que tienen acceso a archivos */
    var result:string[]=await daoFile.findUsers("bbbbbbbbbb");
    console.log(result);
}

main()