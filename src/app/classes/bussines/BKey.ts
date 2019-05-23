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
import { IDAOFileInfo } from "../dataAccess/dao/IDAOFileInfo";
import { MDBDAOFileInfo } from "../dataAccess/dao/MDBDAOFileInfo";
import { IDAOKey } from "../dataAccess/dao/IDAOKey";
import { MDBDAOKey } from "../dataAccess/dao/MDBDAOKey";
import { DTOKey } from "../dataAccess/dto/DTOKey";
import { DTOFileInfo } from "../dataAccess/dto/DTOFileInfo";
const filestr = require('fs');
export class BKey
{
    private hashO:IHash
    private rsa:IRSA;
    private pathP:string;
    private daoKey:IDAOKey;
    private fsO:IDAOFileData;
    constructor()
    {
        this.rsa=new RSA();
        this.hashO=new SHA256();
        this.daoKey=new MDBDAOKey();
        this.fsO=new FSDAOFileData();
        this.pathP="../../../../storage/";
    }
    async decipherKey(key:Buffer,hash:string)
    {
        var result=undefined;
        
        var privKey = filestr.readFileSync("./privateKey.txt").toString();
        var decipheredKey= await this.rsa.privateDecryption(privKey, key, 'rocanroll');
        if(this.hashO.compareHash(decipheredKey.toString(),hash))
        {
            result=decipheredKey;
        }
        return result;
    }
    async cipherKey(key:Buffer)
    {
        var pubKey = filestr.readFileSync("./publicKey.txt").toString();
        var cipheredKey = this.rsa.publicEncryption(pubKey.toString(), key);
        return cipheredKey;
    }
    async storeKey(dtoKey:DTOKey, key:Buffer)
    {
        var status:boolean=false;
        var check;
        if((check=this.decipherKey(key,dtoKey.getKeyHash()))!=undefined)//REVISAR SI ES VIABLE
        {
            try
            {
                await this.daoKey.createKey(dtoKey);
                await this.fsO.createFile(this.pathP,dtoKey.getKeyFileName(),key);
                check=undefined;
                status=true;
            }
            catch(x)
            {
                status=false;
            }
        }
        return status;
    }
    //Falta el findKey
}