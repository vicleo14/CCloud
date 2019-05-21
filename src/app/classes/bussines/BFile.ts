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
/*
import { AES256 } from "../crypto/AES256";
import { IBlockCipher } from "../crypto/IBlockCipher";
import { RandomGenerator } from "../crypto/RandomGenerator";
import { IRandomGenerator } from "../crypto/IRandomGenerator";
import {CryptoConstants} from "../utils/CryptoConstants";
*/
import {IMac} from "../crypto/IMac";
import {HMac} from "../crypto/HMac"; 

import {IHash} from "../crypto/IHash";
import {SHA256} from "../crypto/SHA256";

import * as fs from 'fs';

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
			var cipheredName = rsa.privateEncryption(this.privateKey, name, 'camaleon');
			//Creating the file
			dto_file_data.setFileName(cipheredName.toString('base64'));
			dto_file_data.setData(cfile);
			dao_file_data.createFile("../uploadedFiles", dto_file_data);
			
			//Filling file's information
			dto_file_info.setCipheredName(cipheredName.toString('base64'));
			dto_file_info.setSize(size);
			dto_file_info.setDecipheredName(name);
			dto_file_info.setId();
			dto_file_info.setMAC(MAC);
			dto_file_info.setDate();
			dao_file_info.createFile(nickname, dto_file_info);
			
			//Hashing file's key
			var hashedKey = hash.calculateHash(cipheredKey.toString('base64'));
			//Filling key's information
			dto_key.setIdFile(dto_file_info.getId());
			dto_key.setIdType(1);
			dto_key.setKeyHash(hashedKey);
			dto_key.setKeyFileName();
			dao_key.createKey(dto_key);

			return true;
		}
		else
			return false;
	}

	public downloadFile():void{
		var dto_file:DTOFile = new DTOFile();
		var dao_file:DAOFile = new DAOFile();
		dto_file.
	}

	public updateFile():boolean{
		return ;
	}

	public deleteFile():boolean{
		return ;
	}
}