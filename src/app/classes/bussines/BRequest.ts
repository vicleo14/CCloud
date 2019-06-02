import { DTOFileInfo } from "../dataAccess/dto/DTOFileInfo";
import { MDBDAOFileInfo } from "../dataAccess/dao/MDBDAOFileInfo";
import { IDAOFileInfo } from "../dataAccess/dao/IDAOFileInfo";

import { DTORequest } from "../dataAccess/dto/DTORequest";
import { MDBDAORequest } from "../dataAccess/dao/MDBDAORequest";
import { IDAORequest } from "../dataAccess/dao/IDAORequest";
import {RequestConstants} from "../utils/RequestConstants";

import { DTOAction } from "../dataAccess/dto/DTOAction";
import { MDBDAOAction } from "../dataAccess/dao/MDBDAOAction";
import { IDAOAction } from "../dataAccess/dao/IDAOAction";
import {ActionConstants} from "../utils/ActionConstants";

export class BRequest{

	constructor(){}
	
	async findRequestsByUser(nickname:string){
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_request:IDAORequest = new MDBDAORequest();
		var requests:DTORequest[]=new Array();
		var fileName:string, keyType:string, state_desc:string;
		//var file_1:DTOFileInfo = new DTOFileInfo();
		type imprimir={
			file:string,
			keyType:string,
			date:Date,
			state:string
		};

		var results:imprimir[] = new Array();
		
		//Obtaining the requests
		requests = await dao_request.findRequestByUser(nickname);
		console.log(requests.length);
		//For each request
		for(var i=0; i<requests.length; i+=1){
			//Searching for the file of the request
			var file_1 = await dao_file_info.findFileById(requests[i].getIdFile());
	        console.log(file_1);
	        //Type of the key which was made the request
	        requests[i].getIdKeyType()?keyType="File":keyType="MAC";
	        //Name of the file
	        fileName = file_1[0].getDecipheredName();;
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
	        results[i] = {
	            file:fileName,
	            keyType:keyType,
	            date:dat,
	            state:state_desc
	        }
	        console.log(results[i]);
		}
		return results;
	}

	async newRequest(nickname:string, fileId:string, keyType:number){
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_request:IDAORequest = new MDBDAORequest();
		var dto_request:DTORequest=new DTORequest();
		var dto_file_info:DTOFileInfo = new DTOFileInfo();
		var dao_action:IDAOAction = new MDBDAOAction();
		//Verify if the user already did a request for the key of this file

		/*---------------------- VICTOR: REVISAR LOGICA DEL REQUEST -----------------------------*/
		if(await dao_request.findRequestByUserFileAndType(nickname, fileId, keyType) != null)
			return false;
		//Searching the specified file
		dto_file_info = await dao_file_info.findFileById(fileId);
		//If the file wasn't found
		if(dto_file_info == null){
			dao_action.createAction(nickname, ActionConstants.ACTION_FILE_NOTFOUND);
			return false;
		}
		//If the file was found
		else{
			//Creating the new request
			dto_request.setIdFile(fileId);
			dto_request.setUser(nickname);
			dto_request.setIdKeyType(keyType);
			dao_request.createRequest(dto_request);
			//Storing the actions
			dao_action.createAction(nickname, ActionConstants.ACTION_KEY_UNDEFINED);//CAMBIAR LA ACCION UNDEFINED
			return true;
		}
	}

	async confirmRequest(nickname:string, fileId:string, keyType:number, privateKey:string){
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_request:IDAORequest = new MDBDAORequest();
		var dto_request:DTORequest=new DTORequest();
		var dto_file_info:DTOFileInfo = new DTOFileInfo();
		var dao_action:IDAOAction = new MDBDAOAction();
		//Verifies the master key
		
		//Searches the specified request
		dto_request = await dao_request.findRequestByUserFileAndType(nickname, fileId, keyType);
		if(dto_request == null)
			return false;
		//Change the state of the request to confirmed
		dto_request.setState(RequestConstants.REQUEST_CONFIRMED);
		//Returning the key
		return ;
	}

	async requestFinalized(nickname:string, fileId:string, keyType:number){

	}
}