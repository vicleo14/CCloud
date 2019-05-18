import {ActionConstants} from "../src/app/classes/utils/ActionConstants"
import {DTOAction} from "../src/app/classes/dataAccess/dto/DTOAction"
import {IDAOAction} from "../src/app/classes/dataAccess/dao/IDAOAction"
import {MDBDAOAction} from "../src/app/classes/dataAccess/dao/MDBDAOAction"

async function main()
{
    console.log("Inicio");
    var actions:IDAOAction=new MDBDAOAction();
    var dtoAction:DTOAction=new DTOAction();
    //dtoAction.setAction(ActionConstants.ACTION_KEY_UNDEFINED);
    /* CREAR ACCION */
    /*
    await actions.createAction("victor1",ActionConstants.ACTION_KEY_UNDEFINED);
    */
   /* ECONTRAR ACCIONES */
   var resActions=await actions.findActionsByType(ActionConstants.ACTION_SESSION_USERREGISTRERED);
   console.log(resActions);

}
main();