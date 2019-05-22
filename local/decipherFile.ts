import { AES256 } from "../src/app/classes/crypto/AES256";
import { IBlockCipher } from "../src/app/classes/crypto/IBlockCipher";
import { RandomGenerator } from "../src/app/classes/crypto/RandomGenerator";
import { IRandomGenerator } from "../src/app/classes/crypto/IRandomGenerator";
import {CryptoConstants} from "../src/app/classes/utils/CryptoConstants";
import {ExtensionConstants} from "../src/app/classes/utils/ExtensionConstants";
import {IHash} from "../src/app/classes/crypto/IHash";
import {SHA256} from "../src/app/classes/crypto/SHA256";
import {IMac} from "../src/app/classes/crypto/IMac";
import {HMac} from "../src/app/classes/crypto/HMac";
import {IDAOFileData} from "../src/app/classes/dataAccess/dao/IDAOFileData";
import {FSDAOFileData} from "../src/app/classes/dataAccess/dao/FSDAOFileData";
import {IRSA} from '../src/app/classes/crypto/IRSA';
import {RSA} from '../src/app/classes/crypto/RSA';
import { IDAOFileInfo } from "../src/app/classes/dataAccess/dao/IDAOFileInfo";
import { MDBDAOFileInfo } from "../src/app/classes/dataAccess/dao/MDBDAOFileInfo";
import { IDAOKey } from "../src/app/classes/dataAccess/dao/IDAOKey";
import { MDBDAOKey } from "../src/app/classes/dataAccess/dao/MDBDAOKey";
import { DTOKey } from "../src/app/classes/dataAccess/dto/DTOKey";
import { DTOFileInfo } from "../src/app/classes/dataAccess/dto/DTOFileInfo";
var name1="c.gnf";//"cipheredData"+ExtensionConstants.GENERIC_EXTENSION;
var name2="key.vmf";//"key"+ExtensionConstants.CIPHERKEYD_EXTENSION;
var name3="mac.drc";//"mac"+ExtensionConstants.MACKEYD_EXTENSION;
var namep="pruebaIMG.png";
var pathP="../storage/";
var c1c="key.cdcr";
var c2c="mac.cvmf";
var arcC="cipheredData.gnf";
const filestr = require('fs');
async function decipherFile(idFile)
{
    const path="../storage/";

    var  cipher:IBlockCipher=new AES256();
    var generator:IRandomGenerator=new RandomGenerator();
    var mac:IMac=new HMac();
    var hash:IHash=new SHA256();
    var fs:IDAOFileData=new FSDAOFileData();
    var rsa:IRSA=new RSA();
    /* DECIFRADO */
    var pubKey = filestr.readFileSync("../local/publicKey.txt").toString();
    var privKey = filestr.readFileSync("../local/privateKey.txt").toString();
    /* Obtenemos datos de archivos */
    var daoFile:IDAOFileInfo=new MDBDAOFileInfo();
    var daoKey:IDAOKey=new MDBDAOKey();
    var infoFile:DTOFileInfo=await daoFile.findFileById(idFile);
    var keys:DTOKey[]=await daoKey.findKeysByFileId(idFile);
    
     /* LEEMOS LLAVES Y ARCHIVO CIFRADO */
     var nameFileC=infoFile[0].getCipheredName();
     var nameFileD=infoFile[0].getDecipheredName();
     var macArc=infoFile[0].getMAC();
     var nameKeyM=keys[1].getKeyFileName();
     var nameKeyC=keys[0].getKeyFileName();
     var hashKeyM=keys[1].getKeyHash();
     var hashKeyC=keys[0].getKeyHash();
     var cipheredAESkey=fs.readFile(path,nameKeyC);
     var cipheredMACkey=fs.readFile(path,nameKeyM);
     var cipheredMessage=fs.readFile(path,nameFileC);
     /* DECIFRAMOS LLAVES */
    var decipheredKeyC= rsa.privateDecryption(privKey, cipheredAESkey, 'rocanroll');
    var decipheresKeyM = rsa.privateDecryption(privKey, cipheredMACkey, 'rocanroll');

    /* VERIFICAMOS HASH DE LLAVES */
    if(hash.compareHash(decipheresKeyM.toString(),hashKeyM) && hash.compareHash(decipheredKeyC.toString(),hashKeyC))
    {     
        console.log("Key hash verified");
        /* VERIFICAMOS MAC DEL ARCHIVO */
        console.log(mac.calculateMac(cipheredMessage.toString(),decipheresKeyM.toString()));
        if(mac.verifyMac(cipheredMessage.toString(),decipheresKeyM.toString(),macArc))
        {
            console.log("Integrity verified");
            var result=cipher.decipherFile(cipheredMessage,decipheredKeyC.toString());
            return result;
            fs.createFile("./",nameFileD,result);
            /* SE TIENE QUE CIFRAR CON NUEVAS LLAVES */
            console.log("creado ",nameFileD);
        }
        else{
            console.log("Something is bad")
            return undefined;
        }
        /*console.log(cipheredAESkey);*/
    }else{
        console.log("Something is bad")
        return undefined;
    }

}
decipherFile("vicleo16pruebaIMG20195321075317");


