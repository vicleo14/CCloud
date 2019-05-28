import { AES256 } from "../crypto/AES256";
import { IBlockCipher } from "../crypto/IBlockCipher";
import { RandomGenerator } from "../crypto/RandomGenerator";
import { IRandomGenerator } from "../crypto/IRandomGenerator";

import {CryptoConstants} from "../utils/CryptoConstants";
import {ExtensionConstants} from "../utils/ExtensionConstants";

import {IHash} from "../crypto/IHash";
import {SHA256} from "../crypto/SHA256";

import {IMac} from "../crypto/IMac";
import {HMac} from "../crypto/HMac";

import {IDAOFileData} from "../dataAccess/dao/IDAOFileData";
import {FSDAOFileData} from "../dataAccess/dao/FSDAOFileData";

import {IRSA} from '../crypto/IRSA';
import {RSA} from '../crypto/RSA';

import { IDAOUser } from "../dataAccess/dao/IDAOUser";
import { MDBDAOUser } from "../dataAccess/dao/MDBDAOUser";
import { DTOUser } from "../dataAccess/dto/DTOUser";

import { IDAOFileInfo } from "../dataAccess/dao/IDAOFileInfo";
import { MDBDAOFileInfo } from "../dataAccess/dao/MDBDAOFileInfo";
import { DTOFileInfo } from "../dataAccess/dto/DTOFileInfo";

import { IDAOKey } from "../dataAccess/dao/IDAOKey";
import { MDBDAOKey } from "../dataAccess/dao/MDBDAOKey";
import { DTOKey } from "../dataAccess/dto/DTOKey";


export class BMaster{
	constructor(){}

	async decipherKeys(masterUser:string, masterKey:string){
		var dao_user:IDAOUser = new MDBDAOUser();
		var dto_user:DTOUser = new DTOUser();
		//Verifying user
		if(await (dto_user = dao_user.findUsers(masterUser)) != undefined){
			
		}
		else{
			return false;
		}
	}
}