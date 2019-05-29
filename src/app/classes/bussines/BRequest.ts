import { DTOFileInfo } from "../dataAccess/dto/DTOFileInfo";
import { MDBDAOFileInfo } from "../dataAccess/dao/MDBDAOFileInfo";
import { IDAOFileInfo } from "../dataAccess/dao/IDAOFileInfo";

import { DTORequest } from "../dataAccess/dto/DTORequest";
import { MDBDAORequest } from "../dataAccess/dao/MDBDAORequest";
import { IDAORequest } from "../dataAccess/dao/IDAORequest";

import { DTOAction } from "../dataAccess/dto/DTOAction";
import { MDBDAOAction } from "../dataAccess/dao/MDBDAOAction";
import { IDAOAction } from "../dataAccess/dao/IDAOAction";

export class BRequest{

	constructor(){}
	
	async findRequestsByUser(nickname:string){
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_request:IDAORequest = new MDBDAORequest();
		var requests:DTORequest[]=new Array();
		var fileName:string, keyType:string, state_desc:string;
		var imprimir=[];
		
		//Obtaining the requests
		requests = dao_request.findRequestByUser(nickname);
		//For each request
		for(var i=0; i<requests.length; i+=1){
			//Searching for the file of the request
			var file = await dao_file_info.findFileById(requests[i].getIdFile());
	        //Type of the key which was made the request
	        requests[i].getIdKeyType()?keyType="File":keyType="MAC";
	        //Name of the file
	        fileName = file[i].getDecipheredName();
	        //Getting the state of the request
	        var state = requests[i].getState();
	        if(state == 1)
	            state_desc="Sent";
	        else if(state == 2)
	            state_desc="Confirmed";
	        else
	            state_desc="Finished";
	        //Getting the date in which the request was made
	        var dat = requests[i].getCodeDate();
	        imprimir[i] = {
	            file:fileName,
	            keyType:keyType,
	            date:dat,
	            state:state_desc
	        }
		}
		console.log(imprimir);
		return JSON.stringify(imprimir);
	}

	async newRequest(nickname:string, file:string, keyType:number){

	}

	async confirmRequest(){

	}

	async requestFinalized(nickname: string){

	}
}