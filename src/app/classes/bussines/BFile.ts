import { DTOFileInfo } from "../dataAccess/dto/DTOFileInfo";
import { MDBDAOUser } from "../dataAccess/dao/MDBDAOFileInfo";
import { IDAOFileInfo } from "../dataAccess/dao/IDAOFileInfo";

import { DTOFileData } from "../dataAccess/dto/DTOFileData";
import { MDBDAOUser } from "../dataAccess/dao/MDBDAOFileData";
import { IDAOFileData } from "../dataAccess/dao/IDAOFileData";

import { AES256 } from "../crypto/AES256";
import { IBlockCipher } from "../crypto/IBlockCipher";
import { RandomGenerator } from "../crypto/RandomGenerator";
import { IRandomGenerator } from "../crypto/IRandomGenerator";
import {CryptoConstants} from "../utils/CryptoConstants";

import {IMac} from "../crypto/IMac";
import {HMac} from "../crypto/HMac"; 

export class BFile
{
	constructor(){}

	public uploadFile(cname:string, cfile:Buffer, size:number, kMAC:string, MAC:string, ckey:string):boolean{
		var dto_file_info:DTOFileInfo = new DTOFileInfo();
		var dto_file_data:DTOFileData = new DTOFileData();
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_file_data:IDAOFileData = new MDBDAOFileData();
		var hmac:IMac = new HMac();
		//Decryption of the MACs key
		//It will be decrypted with RSA algorithm

		//Verifying the MAC
		if(hmac.verifyMac()){
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