import { DTOFileInfo } from "../dataAccess/dto/DTOFileInfo";
import { MDBDAOFileInfo } from "../dataAccess/dao/MDBDAOFileInfo";
import { IDAOFileInfo } from "../dataAccess/dao/IDAOFileInfo";

import { DTOFileData } from "../dataAccess/dto/DTOFileData";
import { FSDAOFileData } from "../dataAccess/dao/FSDAOFileData";
import { IDAOFileData } from "../dataAccess/dao/IDAOFileData";

import { DTOAction } from "../dataAccess/dto/DTOAction";
import { MDBDAOAction } from "../dataAccess/dao/MDBDAOAction";
import { IDAOAction } from "../dataAccess/dao/IDAOAction";

import { DTOKey } from "../dataAccess/dto/DTOKey";
import { MDBDAOKey } from "../dataAccess/dao/MDBDAOKey";
import { IDAOKey } from "../dataAccess/dao/IDAOKey";

import {IRSA} from "../crypto/IRSA";
import {RSA} from "../crypto/RSA";
import {IRSAKeyGenerator} from "../crypto/IRSAKeyGenerator";
import {RSAKeyGenerator} from "../crypto/RSAKeyGenerator";

import { AES256 } from "../crypto/AES256";
import { IBlockCipher } from "../crypto/IBlockCipher";
import { RandomGenerator } from "../crypto/RandomGenerator";
import { IRandomGenerator } from "../crypto/IRandomGenerator";
import {CryptoConstants} from "../utils/CryptoConstants";

import {IMac} from "../crypto/IMac";
import {HMac} from "../crypto/HMac"; 

import {IHash} from "../crypto/IHash";
import {SHA256} from "../crypto/SHA256";

import * as fs from 'fs';
import {downloadData} from "../utils/downloadDataType";

export class BFile
{
	private privateKey:string;
	private publicKey:string;
	constructor(){
		//Getting server keys
		this.publicKey = fs.readFileSync("../publicKey.txt").toString();
		this.privateKey = fs.readFileSync("../privateKey.txt").toString();
	}

	public uploadFile(nickname:string, name:string, cfile:Buffer, size:number, cipheredKeyMAC:Buffer, MAC:string, cipheredKey:Buffer):boolean{
		var dto_file_info:DTOFileInfo = new DTOFileInfo();
		var dto_file_data:DTOFileData = new DTOFileData();
		var dto_action:DTOAction = new DTOAction();
		var dto_key:DTOKey = new DTOKey();
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_file_data:IDAOFileData = new FSDAOFileData();
		var dao_action:IDAOAction = new MDBDAOAction();
		var dao_key:IDAOKey = new MDBDAOKey();
		var hmac:IMac = new HMac();
		var hash:IHash = new SHA256();
		var rsa:IRSA = new RSA();
		//Decryption of the MACs key
		var decipheredKeyMAC = rsa.privateDecryption(this.privateKey, cipheredKeyMAC, 'camaleon');
		//Verifying the MAC
		if(hmac.verifyMac(cfile.toString(), decipheredKeyMAC, MAC)){
			//File's name encryption
			var keyGen:IRandomGenerator=new RandomGenerator();
		    var aes:IBlockCipher=new AES256();
		    var key_name=keyGen.generateRandom(CryptoConstants.AES_KEYSIZE_BYTES);
		    var cipheredName=aes.cipher(name,key_name);
			//var cipheredName = rsa.privateEncryption(this.privateKey, name, 'camaleon');
			//Creating the file
			dto_file_data.setFileName(cipheredName);
			dto_file_data.setData(cfile);
			dao_file_data.createFile("../uploadedFiles", dto_file_data);
			
			//Obtaining the date
			var date = new Date();
			//Calculating id
			var id = nickname.concat(cipheredName, date.toString().slice(0, 24));
			//Filling file's information
			dto_file_info.setCipheredName(cipheredName);
			dto_file_info.setSize(size);
			dto_file_info.setDecipheredName(name);
			dto_file_info.setId(id);
			dto_file_info.setMAC(MAC);
			dto_file_info.setDate(date);
			dao_file_info.createFile(nickname, dto_file_info);
			
			//Hashing file's key
			var hashedKey = hash.calculateHash(cipheredKey.toString('base64'));
			//Filling key's information
			dto_key.setIdFile(dto_file_info.getId());
			dto_key.setIdType(1);
			dto_key.setKeyHash(hashedKey);
			dto_key.setKeyFileName(key_name);
			dao_key.createKey(dto_key);

			//Filling actions
			dao_action.createAction(nickname, 2001);
			dao_action.createAction(nickname, 3006);
			return true;
		}
		else{
			dao_action.createAction(nickname, 2005);
			return false;
		}
	}

	public downloadFile(nickname:string, fileName:string):downloadData{
		var dto_file_info:DTOFileInfo = new DTOFileInfo();
		var dto_file_data:DTOFileData = new DTOFileData();
		var dto_action:DTOAction = new DTOAction();
		var dto_key:DTOKey = new DTOKey();
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_file_data:IDAOFileData = new FSDAOFileData();
		var dao_action:IDAOAction = new MDBDAOAction();
		var dao_key:IDAOKey = new MDBDAOKey();
		var hmac:IMac = new HMac();
		var hash:IHash = new SHA256();
		var rsa:IRSA = new RSA();
		
		//Searching the file
		let files:DTOFileInfo[]=new Array();
		files = dao_file_info.findFilesByUser(nickname);
		var i = 0;
		for(let f of files){
			if(f[i].getDecipheredName() == fileName){
				dto_file_info = f[i];
				break;
			}
			i+=1;
		}
		//If the file wasn't found
		if(dto_file_info.getId() == null){
			dao_action.createAction(nickname, 2004);
			return null;
		}
		//If the file was found
		else{
			//Obtaining file's data
			var data = dao_file_data.readFile("../uploadedFiles", dto_file_info.getCipheredName());
			dao_action.createAction(nickname, 2002);
			var data_to_return:downloadData;
			data_to_return.data = data;
			data_to_return.fileName = dto_file_info.getDecipheredName();
			data_to_return.MAC = dto_file_info.getMAC();
			return data_to_return;
		}
	}

	public updateFile(nickname:string, name:string, cfile:Buffer, size:number, cipheredKeyMAC:Buffer, MAC:string, cipheredKey:Buffer):boolean{
		var dto_file_info:DTOFileInfo = new DTOFileInfo();
		var dto_file_data:DTOFileData = new DTOFileData();
		var dto_action:DTOAction = new DTOAction();
		var dto_key:DTOKey = new DTOKey();
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_file_data:IDAOFileData = new FSDAOFileData();
		var dao_action:IDAOAction = new MDBDAOAction();
		var dao_key:IDAOKey = new MDBDAOKey();
		var hmac:IMac = new HMac();
		var hash:IHash = new SHA256();
		var rsa:IRSA = new RSA();

		//Searching for the file
		let files:DTOFileInfo[]=new Array();
		files = dao_file_info.findFilesByUser(nickname);
		var i = 0;
		for(let f of files){
			if(f[i].getDecipheredName() == name){
				dto_file_info = f[i];
				break;
			}
			i+=1;
		}
		//If the file wasn't found
		if(dto_file_info.getId() == null){
			dao_action.createAction(nickname, 2004);
			return false;
		}
		else{
			//Decryption of the MACs key
			var decipheredKeyMAC = rsa.privateDecryption(this.privateKey, cipheredKeyMAC, 'camaleon');
			//Verifying the MAC
			if(hmac.verifyMac(cfile.toString(), decipheredKeyMAC, MAC)){
				//Obtaining the date
				var date = new Date();
				dto_file_info.setSize(size);
				dto_file_info.setMAC(MAC);
				dto_file_info.setDate(date);
				dao_file_info.updateFile(dto_file_info);
				dao_action.createAction(nickname, 2000);
				dao_action.createAction(nickname, 3006);
				return true;
			}
			else{
				dao_action.createAction(nickname, 2005);
				return false;
			}
		}
	}

	public deleteFile(nickname:string, fileName:string):boolean{
		var dto_file_info:DTOFileInfo = new DTOFileInfo();
		var dto_action:DTOAction = new DTOAction();
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_file_data:IDAOFileData = new FSDAOFileData();
		var dao_action:IDAOAction = new MDBDAOAction();
		
		//Searching the file
		let files:DTOFileInfo[]=new Array();
		files = dao_file_info.findFilesByUser(nickname);
		var i = 0;
		for(let f of files){
			if(f[i].getDecipheredName() == fileName){
				dto_file_info = f[i];
				break;
			}
			i+=1;
		}
		//If the file wasn't found
		if(dto_file_info.getId() == null){
			dao_action.createAction(nickname, 2004);
			return false;
		}
		//If the file was found
		else{
			dao_file_info.deleteFile(dto_file_info.getId());
			dao_action.createAction(nickname, 2000);
			return true;
		}
	}
}