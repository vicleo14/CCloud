import { DTOFileInfo } from "../dataAccess/dto/DTOFileInfo";
import { MDBDAOFileInfo } from "../dataAccess/dao/MDBDAOFileInfo";
import { IDAOFileInfo } from "../dataAccess/dao/IDAOFileInfo";

import { FSDAOFileData } from "../dataAccess/dao/FSDAOFileData";
import { IDAOFileData } from "../dataAccess/dao/IDAOFileData";

import { DTOContact } from "../dataAccess/dto/DTOContact";
import { IDAOContact } from "../dataAccess/dao/IDAOContact";
import { MDBDAOContact } from "../dataAccess/dao/MDBDAOContact";

import { DTORequest } from "../dataAccess/dto/DTORequest";
import { MDBDAORequest } from "../dataAccess/dao/MDBDAORequest";
import { IDAORequest } from "../dataAccess/dao/IDAORequest";
import {RequestConstants} from "../utils/RequestConstants";

import { DTOAction } from "../dataAccess/dto/DTOAction";
import { MDBDAOAction } from "../dataAccess/dao/MDBDAOAction";
import { IDAOAction } from "../dataAccess/dao/IDAOAction";
import {ActionConstants} from "../utils/ActionConstants";

import {Mail} from "../mail/Mail";

export class BRequest{

	constructor(){}
	
	async findRequestsByUser(nickname:string){
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_request:IDAORequest = new MDBDAORequest();
		var requests:DTORequest[]=new Array();
		var fileName:string, keyType:string, state_desc:string;
		//var file_1:DTOFileInfo = new DTOFileInfo();
		type imprimir={
			idFile:string;
			file:string,
			keyType:string,
			keyTypeNum:number,
			date:Date,
			state:string
		};

		var results:imprimir[] = new Array();
		
		//Obtaining the requests
		requests = await dao_request.findRequestByUser(nickname);
		console.log(requests.length);
		for(var i=0; i<requests.length; i+=1){
			//Searching for the file of the request
			var fileId = requests[i].getIdFile();
			var file_1 = await dao_file_info.findFileById(fileId);
	        console.log(file_1);
	        //Type of the key which was made the request
	        var keyTypeNum:number = requests[i].getIdKeyType();
	        keyTypeNum?keyType="File":keyType="MAC";
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
	        	idFile:fileId,
	            file:fileName,
	            keyType:keyType,
	            keyTypeNum:keyTypeNum,
	            date:dat,
	            state:state_desc
	        }
	        console.log(results[i]);
		}
		return results;
	}

	async findRequestByIdUserAndType(nickname:string, idFile:string, keyType:number){
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_request:IDAORequest = new MDBDAORequest();
		var request:DTORequest=new DTORequest();
		var fileInfo:DTOFileInfo[]=new Array();
		var stateS, keyTypeS;
		type result={
			idFile:string;
			file:string,
			keyType:string,
			keyTypeNum:number,
			date:Date,
			state:string,
			code:number
		};
		//Obtaining the requests
		request = await dao_request.findRequestByUserFileAndType(nickname, idFile, keyType);
		//For each request
		if(request == undefined)
			return false;
		fileInfo=await dao_file_info.findFileById(idFile);
		(keyType==1)?keyTypeS="File":keyTypeS="MAC";
		var state=request.getState();
		if(state == 1)
	            stateS="Sent";
	        else if(state == 2)
	            stateS="Confirmed";
	        else
	            stateS="Finished";
		var res:result={
			idFile:idFile,
			file:fileInfo[0].getDecipheredName(),
			keyType:keyTypeS,
			keyTypeNum:keyType,
			date:request.getCodeDate(),
			state:stateS,
			code:request.getCode()
		};
		return res;
	}

	async findRequestByState(state:number){
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_request:IDAORequest = new MDBDAORequest();
		var request:DTORequest[]=new Array();
		var fileInfo:DTOFileInfo[]=new Array();
		var stateS, keyTypeS;
		type result={
			user:string,
			idFile:string;
			file:string,
			keyType:string,
			keyTypeNum:number,
			date:Date,
			state:string
		};
		var res:result[]=new Array();
		//Obtaining the requests
		request = await dao_request.findRequestsByState(state);
		//For each request
		for(let i=0; i<request.length; i+=1){
			var idFile=request[i].getIdFile();
			fileInfo=await dao_file_info.findFileById(idFile);
			var keyType=request[i].getIdKeyType();
			(keyType==1)?keyTypeS="File":keyTypeS="MAC";
			if(state == 1)
		            stateS="Sent";
		        else if(state == 2)
		            stateS="Confirmed";
		        else
		            stateS="Finished";
			res[i]={
				user:request[i].getUser(),
				idFile:idFile,
				file:fileInfo[0].getDecipheredName(),
				keyType:keyTypeS,
				keyTypeNum:keyType,
				date:request[i].getCodeDate(),
				state:stateS
			};
		}
		return res;
	}


	async newRequest(nickname:string, fileId:string, keyType:number){
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_request:IDAORequest = new MDBDAORequest();
		var dto_request:DTORequest=new DTORequest();
		var dao_contact:IDAOContact = new MDBDAOContact();
		var dto_file_info:DTOFileInfo = new DTOFileInfo();
		var dao_action:IDAOAction = new MDBDAOAction();
		var email:DTOContact[] = new Array();
		var mail:Mail = new Mail();
		//Verify if the user already did a request for the key of this file
		dto_request = await dao_request.findRequestByUserFileAndType(nickname, fileId, keyType);
		if(dto_request == undefined)
			return false;
		//Searching the specified file
		dto_file_info = await dao_file_info.findFileById(fileId);
		//If the file wasn't found
		if(dto_file_info == undefined){
			dao_action.createAction(nickname, ActionConstants.ACTION_FILE_NOTFOUND);
			return false;
		}
		//If the file was found
		else{
			//Calculating request number and storing it into the DB
			do{
				var code = this.generateCode();
				console.log(code);
				//Verifying the code is unique
			}while(dao_request.codeCheckout(code) != undefined);
			//Creating the new request
			dto_request.setIdFile(fileId);
			dto_request.setUser(nickname);
			dto_request.setIdKeyType(keyType);
			dto_request.setCode(code);
			dao_request.createRequest(dto_request);
			//Storing the actions
			dao_action.createAction(nickname, ActionConstants.ACTION_KEY_UNDEFINED);
			//Sendig e-mail
			//Searchig for the user's e-mail
			email = dao_contact.findEmails(nickname);
			mail.sendRequestNumber(email[0].getContact(), nickname, dto_file_info.getDecipheredName(), code);
			dao_action.createAction(nickname, ActionConstants.ACTION_KEY_UNDEFINED);
			return true;
		}
	}

	async confirmRequest(nickname:string, fileId:string, keyType:number, code:number){
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_request:IDAORequest = new MDBDAORequest();
		var dto_request:DTORequest=new DTORequest();
		var dto_file_info:DTOFileInfo[] = new Array();
		var dao_action:IDAOAction = new MDBDAOAction();
		var key:IDAOFileData = new FSDAOFileData();
		//Searches the specified request
		dto_request = await dao_request.findRequestByUserFileAndType(nickname, fileId, keyType);
		if(dto_request == undefined)
			return false;
		//Code verification
		if(dto_request.getCode() != code)
			return false;
		else{
			//Change the state of the request to confirmed
			dto_request.setState(RequestConstants.REQUEST_CONFIRMED);
			//Returning the key
			dto_file_info = dao_file_info.findFileById(fileId);
			var fileName = dto_file_info[0].getCipheredName();
			var dataBuf = key.readFile("./../../../../storage", fileName);
			return dataBuf.toString('base64');
		}
	}

	async requestFinalized(nickname:string, fileId:string, keyType:number){

	}

	generateCode():number{
		return Math.floor(Math.random() * (999999-100000));
	}
}