import { DTOFileInfo } from "../dataAccess/dto/DTOFileInfo";
import { MDBDAOUser } from "../dataAccess/dao/MDBDAOFileInfo";
import { IDAOFileInfo } from "../dataAccess/dao/IDAOFileInfo";

import { DTOFileData } from "../dataAccess/dto/DTOFileData";
import { MDBDAOUser } from "../dataAccess/dao/MDBDAOFileData";
import { IDAOFileData } from "../dataAccess/dao/IDAOFileData";

import { DTOAction } from "../dataAccess/dto/DTOAction";
import { MDBDAOAction } from "../dataAccess/dao/MDBDAOAction";
import { IDAOAction } from "../dataAccess/dao/IDAOAction";

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

import * as fs from 'fs';

export class BFile
{
	private privateKey:string;
	private publicKey:string;
	constructor(){}

	public uploadFile(cname:string, cfile:Buffer, size:number, cipheredKeyMAC:Buffer, MAC:string, cipheredKey:Buffer):boolean{
		var dto_file_info:DTOFileInfo = new DTOFileInfo();
		var dto_file_data:DTOFileData = new DTOFileData();
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_file_data:IDAOFileData = new MDBDAOFileData();
		var hmac:IMac = new HMac();
		//Getting server keys
		this.publicKey = fs.readFileSync("../publicKey.txt").toString();
		this.privateKey = fs.readFileSync("../privateKey.txt").toString();
		//Decryption of the MACs key
		var rsa:IRSA = new RSA();

		var decipheredMAC = rsa.privateDecryption(this.privateKey, cipheredKeyMAC, 'camaleon');
		var decodedMAC:string = decipheredMAC.toString();
		console.log 
		//Verifying the MAC
		if(hmac.verifyMac(cfile, )){
			dto_file.set
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