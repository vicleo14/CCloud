
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

import{BFile} from "../bussines/BFile"
import {ExtensionConstants} from "../utils/ExtensionConstants";
import {ActionConstants} from "../utils/ActionConstants";
import {KeyConstants} from "../utils/KeyConstants";
import {Mail} from "../mail/Mail";
import { DTOUser } from "../dataAccess/dto/DTOUser";
import { MDBDAOContact } from "../dataAccess/dao/MDBDAOContact";
import { IDAOContact } from "../dataAccess/dao/IDAOContact";
import { DTOContact } from "../dataAccess/dto/DTOContact";
import { ContactConstants } from "../utils/ContactConstants";
const filestr = require('fs');
const path="storage/";
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
    async decipherKey(key:string,hash:string)
    {
        var result=undefined;
        console.log("Hash recibido",hash);
        
        var privKey = filestr.readFileSync("./privateKey.txt").toString();
        var decipheredKey= await this.rsa.privateDecryption(privKey, key, 'rocanroll');
        console.log("Hash calculado",this.hashO.calculateHash(decipheredKey));
        if(this.hashO.compareHash(decipheredKey.toString(),hash))
        {
            result=decipheredKey;
        }
        return result;
    }
    async cipherKey(key:string)
    {
        var pubKey = filestr.readFileSync("./publicKey.txt").toString();
        var cipheredKey = this.rsa.publicEncryption(pubKey.toString(), key);
        return cipheredKey.toString();
    }
    async storeKey(dtoKey:DTOKey, key:string)
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
    async keyLost(user:string,idFile:string)
    {
        console.log("Comienza key lost");
        var daoContact:IDAOContact=new MDBDAOContact();
        var mail:Mail=new Mail();
        var fs:IDAOFileData=new FSDAOFileData();
        var rsa:IRSA=new RSA();
        var generator:IRandomGenerator=new RandomGenerator();
        var hmac:IMac=new HMac();
        var hash:IHash=new SHA256();
        var dto_file_info:DTOFileInfo = new DTOFileInfo();
		var dto_action:DTOAction = new DTOAction();
		var dao_file_info:IDAOFileInfo = new MDBDAOFileInfo();
		var dao_file_data:IDAOFileData = new FSDAOFileData();
		var dao_action:IDAOAction = new MDBDAOAction();
		var dao_key:IDAOKey = new MDBDAOKey();
		var resultKeys=await dao_key.findKeysByFileId(idFile);
        var resultFile=await dao_file_info.findFileById(idFile);
        var bfile:BFile=new BFile();
        var cipher:IBlockCipher=new AES256();
        var dataFile=await dao_file_data.readFile(path,resultFile[0].getCipheredName()).toString();
        var key1=await dao_file_data.readFile(path,resultKeys[0].getKeyFileName()).toString();
        var key2=await dao_file_data.readFile(path,resultKeys[1].getKeyFileName()).toString();
        /* K2 es MAC */
        var decipheredK1,decipheredK2;
        if((decipheredK1=await this.decipherKey(key1,resultKeys[0].getKeyHash()))!=undefined && (decipheredK2=await this.decipherKey(key2,resultKeys[1].getKeyHash()))!=undefined)
        {
             //Se obtienen las llaves RSA anteriormente creadas
            var pubKey = filestr.readFileSync("./publicKey.txt");
            console.log("Keys OK");
            var decipheredFile=await bfile.decipher(dataFile, decipheredK1, resultFile[0].getMAC(), decipheredK2)
            //dao_file_data.createFile(path,resultFile[0].getDecipheredName(),decipheredFile);
            /* GENERAMOS CLAVES */
            var keyC=generator.generateRandom(CryptoConstants.AES_KEYSIZE_BYTES);
            var keyM=generator.generateRandom(CryptoConstants.AES_KEYSIZE_BYTES);

            /* CALCULAMOS HASH DE LAS LLAVES */
            var hkey1=hash.calculateHash(keyC);
            var hkey2=hash.calculateHash(keyM);

            /* CIFRAMOS  */
            var cipheredData=await bfile.cipher(decipheredFile.toString("base64"), keyC);
            //console.log("CIPHERED_DATA_2:",cipheredData);
            /* CALCULAMOS MAC 
            DUDA: NO SE SI SE CALCULA LA MAC CON LA CADENA SIN FORMATO ESPECIFICO
            */
            var mres=hmac.calculateMac(cipheredData.toString(),keyM);

            //Se cifran con la llave pública la llave de la mac y la llave del archivo
            var cipheredKeyM = rsa.publicEncryption(pubKey.toString(), keyM);
            var cipheredKeyC = rsa.publicEncryption(pubKey.toString(), keyC);
            //Almacenamos en HDD
            fs.createFile(path,resultFile[0].getCipheredName(),cipheredData.toString("base64"));
            fs.createFile(path,resultKeys[0].getKeyFileName(),cipheredKeyC);
            fs.createFile(path,resultKeys[1].getKeyFileName(),cipheredKeyM);

            //Almacenamos en BD
            var dtoFile:DTOFileInfo=new DTOFileInfo();
            dtoFile.setId(idFile);
            dtoFile.setDecipheredName(resultFile[0].getDecipheredName());
            dtoFile.setCipheredName(resultFile[0].getCipheredName());
            dtoFile.setMAC(mres);
            dtoFile.setDate(new Date());
            dtoFile.setSize(decipheredFile.length);
            var dtoK1:DTOKey=new DTOKey();
            dtoK1.setIdFile(idFile);
            dtoK1.setIdType(KeyConstants.KEY_CIPHER_DECIPHER);
            dtoK1.setKeyFileName(resultKeys[0].getKeyFileName());
            dtoK1.setKeyHash(hkey1);

            var dtoK2:DTOKey=new DTOKey();
            dtoK2.setIdFile(idFile);
            dtoK2.setIdType(KeyConstants.KEY_INTEGRITY);
            dtoK2.setKeyFileName(resultKeys[1].getKeyFileName());
            dtoK2.setKeyHash(hkey2);

            //DAOS

            var daoFile:IDAOFileInfo=new MDBDAOFileInfo();
            var daoKey:IDAOKey=new MDBDAOKey();
            await daoFile.updateFile(dtoFile);
            await daoKey.updateKey(dtoK1);
            await daoKey.updateKey(dtoK2);

            var dtoUsers:string[]=await dao_file_info.findUsers(idFile);
            console.log(dtoUsers);
            for(var i=0;i<dtoUsers.length;i++)
            {
                
                var dtoUser=dtoUsers[i];
                console.log("USER:",dtoUser);
                var contacts:DTOContact[]=await daoContact.findContacts(dtoUser);
                for(var j=0;j<contacts.length;j++)
                {

                    var dtoContact:DTOContact=contacts[j];
                    console.log("CONTACT:",dtoContact);
                    if(dtoContact!=undefined && dtoContact.getType()==ContactConstants.CONTACT_EMAIL)
                    {
                        console.log("Mail a ",dtoUser);
                        mail.notifyKeyChanged(dtoContact.getContact(),dtoUser,resultFile[0].getDecipheredName());
                    }
                }
            }
        }	
    }
}