import { DTORequest } from "../dataAccess/dto/DTORequest";
import { MDBDAORequest } from "../dataAccess/dao/MDBDAORequest";
import { IDAORequest } from "../dataAccess/dao/IDAORequest";

class hola{
	constructor(){}
	async func(){
		var dao_request:IDAORequest = new MDBDAORequest();
		var response = await dao_request.findRequestByUserFileAndType("memo1", "memo1Canciones.txt20190328100359", 1);
		console.log(response);
	}
}

var p:hola=new hola();
p.func();