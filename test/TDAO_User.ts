import {IConnector} from "../src/app/classes/dataAccess/connector/IConnector"
import {MDBConnector} from "../src/app/classes/dataAccess/connector/MDBConnector"

export class TDAO_User
{
    constructor()
    {
    }
    public main():void{
        console.log("Hola");
        var connector:IConnector;
        connector= new MDBConnector();
        connector.connect();
        var query = connector.getConnection().query(
            //'INSERT INTO personaje(nombre, apellido, biografia) VALUES(?, ?, ?)', 
            'SELECT * FROM keyType', 
            ['Homero', 'Simpson', 'Esposo de Marge y padre de Bart, Lisa y Maggie.'], 
            function(error, result){
            if(error){
               throw error;
            }else{
               console.log(result);
               connector.close();
            }
          }
         );
        
    }
}
var tdaouser:TDAO_User=new TDAO_User();
tdaouser.main();
