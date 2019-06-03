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
import {BKey} from "./BKey";
import * as dateFormat from 'dateformat';

const name1="cipheredData"+ExtensionConstants.GENERIC_EXTENSION;
const name2="key"+ExtensionConstants.CIPHERKEYC_EXTENSION;
const name3="mac"+ExtensionConstants.MACKEYC_EXTENSION;
const path="storage/";

export class BFile
{
	private privateKey:string;
	private publicKey:string;
	private bsKey:BKey;

	constructor(){
		//Getting server keys
		this.publicKey = fs.readFileSync("publicKey.txt").toString();
		this.privateKey = fs.readFileSync("privateKey.txt").toString();
		this.bsKey=new BKey();
	}

	async uploadFile(nickname:string, name:string, cfile:string, size:number, cipheredKeyMAC:string, 
		MAC:string, cipheredKey:string, hashMac:string, hashKeyFile:string){
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
		
		//Decryption of the keys
		var decipheredKeyMAC = rsa.privateDecryption(this.privateKey, cipheredKeyMAC, 'rocanroll').toString();
		var decipheredKeyFile = rsa.privateDecryption(this.privateKey, cipheredKey, 'rocanroll').toString();
		//Verifying keyMacHash and keyFileHash 
		if(hash.compareHash(decipheredKeyMAC, hashMac) && hash.compareHash(decipheredKeyFile, hashKeyFile)){
			//Verifying the MAC
			if(this.verify(cfile, MAC, decipheredKeyMAC)){
				//Obtaining the date
				var date = new Date();
				//Calculating id
				var split = name.split(".");
				var id = nickname + split[0] + dateFormat( new Date(),"yyyyMMddhhMMss");

				//Filling file's information
				dto_file_info.setCipheredName(id+ExtensionConstants.GENERIC_EXTENSION);
				dto_file_info.setSize(size);
				dto_file_info.setDecipheredName(name);
				dto_file_info.setId(id);
				dto_file_info.setMAC(MAC);
				dto_file_info.setDate(date);
				dao_file_info.createFile(nickname, dto_file_info);
				
				//Filling file's key information
				dto_key.setIdFile(id);
				dto_key.setIdType(KeyConstants.KEY_CIPHER_DECIPHER);
				dto_key.setKeyHash(hashKeyFile);
				dto_key.setKeyFileName(id+ExtensionConstants.CIPHERKEYC_EXTENSION);
				await dao_key.createKey(dto_key);

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

	async downloadFile(nickname:string, fileName:string){
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
		files = await dao_file_info.findFilesByUser(nickname);
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
			dao_action.createAction(nickname, ActionConstants.ACTION_FILE_NOTFOUND);
			return null;
		}
		//If the file was found
		else{
			//Obtaining file's data
			var idFile = dto_file_info.getId();
			var data = dao_file_data.readFile(path, idFile+ExtensionConstants.GENERIC_EXTENSION);
			//Obtaining keys hashes
			var hashKeyFile:DTOKey = await dao_key.findKeyByFileIdAndType(idFile, KeyConstants.KEY_CIPHER_DECIPHER);
			var hashKeyMac:DTOKey = await dao_key.findKeyByFileIdAndType(idFile, KeyConstants.KEY_INTEGRITY);
			//Returning the data
			var return_data = {
				hashKeyFile : hashKeyFile.getKeyHash(),
				hashKeyMac : hashKeyMac.getKeyHash(),
				mac : dto_file_info.getMAC(),
				data : data.toString()
			}
			dao_action.createAction(nickname, ActionConstants.ACTION_FILE_DOWNLOADED);
			return JSON.stringify(return_data);
		}
	}

	async shareFile(user:string, userShared:string, fileName:string){
		var dto_file_info:DTOFileInfo = new DTOFileInfo();
		var dto_file_data:DTOFileData = new DTOFileData();
		var dto_action:DTOAction = new DTOAction();
		var dto_key:DTOKey = new DTOKey();
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_file_data:IDAOFileData = new FSDAOFileData();
		var dao_action:IDAOAction = new MDBDAOAction();
		var dao_key:IDAOKey = new MDBDAOKey();
		//Searching the file
		let files:DTOFileInfo[]=new Array();
		files = await dao_file_info.findFilesByUser(user);
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
			dao_action.createAction(user, ActionConstants.ACTION_FILE_NOTFOUND);
			return false;
		}
		//If the file was found
		else{
			//Filling data in DB
			var idFile = dto_file_info.getId();
			dao_key.shareKey(idFile, userShared);
			dao_action.createAction(user, ActionConstants.ACTION_FILE_SHARED);
			return true;
		}
	}

	async deleteFile(nickname:string, fileName:string){
		var dto_file_info:DTOFileInfo = new DTOFileInfo();
		var dto_action:DTOAction = new DTOAction();
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_file_data:IDAOFileData = new FSDAOFileData();
		var dao_action:IDAOAction = new MDBDAOAction();
		
		//Searching the file
		let files:DTOFileInfo[]=new Array();
		files = await dao_file_info.findFilesByUser(nickname);
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
			dao_action.createAction(nickname, ActionConstants.ACTION_FILE_NOTFOUND);
			return false;
		}
		//If the file was found
		else{
			dao_file_info.deleteFile(dto_file_info.getId());
			dao_action.createAction(nickname, ActionConstants.ACTION_FILE_UNDEFINED);
			return true;
		}
	}

	/*async saveFile(nickname:string, name:string, cfile:Buffer, size:number, cipheredKeyMAC:string, MAC:string, cipheredKey:string,hashKey:string,hashMac:string)
	{
		var result=undefined;
		const mac:IMac=new HMac();
		const blockCipher:IBlockCipher=new AES256();//Esto cambia si se pone opcion de seguridad
		if(mac.verifyMac(data,macKey,tag))
		{
			try
			{
				var buf=Buffer.from(data,"base64");
				console.log(buf)
				result=await blockCipher.decipherFile(buf,key);
				console.log("Decipher result:",Buffer.from(buf));
				console.log("Decipher size A:",Buffer.from(result).length);
			}
			catch(x)
			{
				console.log("Something is wrong:",x);
				result=undefined;
			}
		}
		else
		{
			result=undefined;
		}
		return result;

	}*/

	/*async saveFileVLMF(nickname:string, name:string, cfile:string, size:number, cipheredKeyMAC:string, MAC:string, cipheredKey:string,hashKey:string,hashMac:string)
	{
		const fs:IDAOFileData=new FSDAOFileData();
		var decipheredKeyC:string;
		var decipheredKeyM:string;
		
		if( (decipheredKeyC=await this.bsKey.decipherKey(cipheredKey,hashKey)) != undefined && (decipheredKeyM=await this.bsKey.decipherKey(cipheredKeyMAC,hashMac)) != undefined)
		{
			
			// GENERAMOS EL NOMBRE DEL ARCHIVO
			var split=name.split(".");
			var nomArcG=nickname+split[0]+dateFormat( new Date(),"yyyyMMddhhMMss");
			var clave=nomArcG;
    		var nomMAC=nomArcG+ExtensionConstants.MACKEYC_EXTENSION;
			var nomKey=nomArcG+ExtensionConstants.CIPHERKEYC_EXTENSION;

			//Almacenamos en HDD
			var name1=nomArcG+ExtensionConstants.GENERIC_EXTENSION;
			fs.createFile(path,name1,cfile);
			fs.createFile(path,nomKey,cipheredKey);
			fs.createFile(path,nomMAC,cipheredKeyMAC);
			
			//Almacenamos en BD
			var dtoFile:DTOFileInfo=new DTOFileInfo();
			dtoFile.setId(clave);
			dtoFile.setDecipheredName(name);
			dtoFile.setCipheredName(name1);
			dtoFile.setMAC(MAC);
			dtoFile.setDate(new Date());
			dtoFile.setSize(size);
			var dtoK1:DTOKey=new DTOKey();
			dtoK1.setIdFile(clave);
			dtoK1.setIdType(KeyConstants.KEY_CIPHER_DECIPHER);
			dtoK1.setKeyFileName(nomKey);
			dtoK1.setKeyHash(hashKey);

			var dtoK2:DTOKey=new DTOKey();
			dtoK2.setIdFile(clave);
			dtoK2.setIdType(KeyConstants.KEY_INTEGRITY);
			dtoK2.setKeyFileName(nomMAC);
			dtoK2.setKeyHash(hashMac);
			//DAOS

			var daoFile:IDAOFileInfo=new MDBDAOFileInfo();
			var daoKey:IDAOKey=new MDBDAOKey();
			await daoFile.createFile(nickname,dtoFile);
			await daoKey.createKey(dtoK1);
			await daoKey.createKey(dtoK2);

			//var decipheredFile=await this.decipherFile(cfile,decipheredKeyC,decipheredKeyM,MAC);
			//fs.createFile(path,name,Buffer.from(decipheredFile));

			console.log("That's ok");
			return true;
		}
		return true;
	}*/


	async cipher(data:string, key:string){
		console.log("DATA:",data.length);
		var aes:IBlockCipher = new AES256();
		return await aes.cipherFile(Buffer.from(data,"base64"), key);
	}

	async decipher(data:string, key:string, mac:string, keyMac:string){
		var aes:IBlockCipher = new AES256();
		var calc_mac:IMac = new HMac();
		if(this.verify(data, mac, keyMac))
			return await aes.decipherFile(Buffer.from(data,"base64"), key);
		else
			return "Error. File corrupted";
	}	

	async verify(data:string, mac:string, keyMac:string):boolean{
		var calc_mac:IMac = new HMac();
		return await calc_mac.verifyMac(data, keyMac, mac)?true:false;
	}
}