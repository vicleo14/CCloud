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

import {ExtensionConstants} from "../utils/ExtensionConstants";
import {ActionConstants} from "../utils/ActionConstants";
import {KeyConstants} from "../utils/KeyConstants";

import * as fs from 'fs';
//import {downloadData} from "../utils/downloadDataType";
import {BKey} from "./BKey";
import * as dateFormat from 'dateformat';

const name1="cipheredData"+ExtensionConstants.GENERIC_EXTENSION;
const name2="key"+ExtensionConstants.CIPHERKEYC_EXTENSION;
const name3="mac"+ExtensionConstants.MACKEYC_EXTENSION;
const path="../../../../storage";

export class BFile
{
	private privateKey:string;
	private publicKey:string;

	private bsKey:BKey;
	constructor(){
		//Getting server keys
		//this.publicKey = fs.readFileSync("../../../../local/publicKey.txt").toString();
		//this.privateKey = fs.readFileSync("../../../../local/privateKey.txt").toString();
		this.bsKey=new BKey()
	}

	async uploadFile(nickname:string, name:string, cfile:Buffer, size:number, cipheredKeyMAC:Buffer, 
		MAC:string, cipheredKey:Buffer, hashMac:string, hashKeyFile:string){
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
		var decipheredKeyMAC = rsa.privateDecryption(this.privateKey, cipheredKeyMAC, 'camaleon').toString();
		//Decryption of the file's key
		var decipheredKeyFile = rsa.privateDecryption(this.privateKey, cipheredKey, 'camaleon').toString();
		//Verifying keyMacHash and keyFileHash 
		if(hash.compareHash(hash.calculateHash(decipheredKeyMAC), hashMac) && hash.compareHash(hash.calculateHash(decipheredKeyFile), hashKeyFile)){
			//Verifying the MAC
			if(hmac.verifyMac(cfile.toString(), decipheredKeyMAC, MAC)){
				//Obtaining the date
				var date = new Date();
				//Calculating id
				var split = name.split(".");
				var id = nickname + name + dateFormat( new Date(),"yyyyMMddhhMMss");

				//Filling file's information
				dto_file_info.setCipheredName(id+ExtensionConstants.GENERIC_EXTENSION);
				dto_file_info.setSize(size);
				dto_file_info.setDecipheredName(name);
				dto_file_info.setId(id);
				dto_file_info.setMAC(MAC);
				dto_file_info.setDate(date);
				dao_file_info.createFile(nickname, dto_file_info);
				
				//Hashing file's key
				var hashedKey = hash.calculateHash(cipheredKey.toString('base64'));
				
				//Filling file's key information
				dto_key.setIdFile(id);
				dto_key.setIdType(KeyConstants.KEY_CIPHER_DECIPHER);
				dto_key.setKeyHash(hashKeyFile);
				dto_key.setKeyFileName(id+ExtensionConstants.CIPHERKEYC_EXTENSION);
				dao_key.createKey(dto_key);

				//Filling MAC's key information
				dto_key.setIdFile(id);
				dto_key.setIdType(KeyConstants.KEY_INTEGRITY);
				dto_key.setKeyHash(hashMac);
				dto_key.setKeyFileName(id+ExtensionConstants.MACKEYC_EXTENSION);
				dao_key.createKey(dto_key);

				//Creating the files
				dao_file_data.createFile(path, id+ExtensionConstants.GENERIC_EXTENSION, cfile);
				dao_file_data.createFile(path, id+ExtensionConstants.CIPHERKEYC_EXTENSION, cipheredKey);
				dao_file_data.createFile(path, id+ExtensionConstants.MACKEYC_EXTENSION, cipheredKeyMAC);

				//Filling actions
				dao_action.createAction(nickname, ActionConstants.ACTION_FILE_UPLOADED);
				dao_action.createAction(nickname, ActionConstants.ACTION_KEY_MACUPLOADED);
				return true;
			}
			else{
				dao_action.createAction(nickname, ActionConstants.ACTION_FILE_CORRUPTED);
				return false;
			}
		}
		return false;
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

	public updateFile(nickname:string, name:string, cfile:Buffer, size:number, cipheredKeyMAC:string, MAC:string, cipheredKey:string):boolean{
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
			var decipheredKeyMAC = rsa.privateDecryption(this.privateKey, cipheredKeyMAC, 'rocanrol');
			//Verifying the MAC
			if(hmac.verifyMac(cfile.toString(), decipheredKeyMAC.toString(), MAC)){
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
	async saveFile(nickname:string, name:string, cfile:Buffer, size:number, cipheredKeyMAC:string, MAC:string, cipheredKey:string,hashKey:string,hashMac:string)
	{
		var decipheredKeyC:string;
		var decipheredKeyM:string;
		if( (decipheredKeyC=await this.bsKey.decipherKey(cipheredKey,hashKey)) != undefined && (decipheredKeyM=await this.bsKey.decipherKey(cipheredKeyMAC,hashMac)) != undefined)
		{
			await console.log(decipheredKeyC);
			await console.log(decipheredKeyM);
			
			console.log("That's ok");
			return true;
		}
		else
		{
			console.log("Something was wrokg");
			return false;
		}
		
	}
}