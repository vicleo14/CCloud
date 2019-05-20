import {IDAOFileData} from "../src/app/classes/dataAccess/dao/IDAOFileData";
import {FSDAOFileData} from "../src/app/classes/dataAccess/dao/FSDAOFileData";

async function main()
{
    console.log("Comienza prueba");
    var fs:IDAOFileData=new FSDAOFileData();

    var result= await fs.readFile("./","testAction.ts");
    console.log(result);
}
main();