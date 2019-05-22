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
var name1="c.gnf";//"cipheredData"+ExtensionConstants.GENERIC_EXTENSION;
var name2="key.vmf";//"key"+ExtensionConstants.CIPHERKEYD_EXTENSION;
var name3="mac.drc";//"mac"+ExtensionConstants.MACKEYD_EXTENSION;
var namep="pruebaIMG.png";
var pathP="../storage/";
var c1c="key.cdcr";
var c2c="mac.cvmf";
var arcC="cipheredData.gnf";
const filestr = require('fs');
function enServidor()
{
    console.log("ADVERTENCIA: LA MAC ESTA FIJA");
    var  cipher:IBlockCipher=new AES256();

    var generator:IRandomGenerator=new RandomGenerator();
    var mac:IMac=new HMac();
    var hash:IHash=new SHA256();
    var fs:IDAOFileData=new FSDAOFileData();
    var rsa:IRSA=new RSA();
    var pubKey = filestr.readFileSync("../local/publicKey.txt").toString();
    var privKey = filestr.readFileSync("../local/privateKey.txt").toString();
    console.log(pubKey.length);
    console.log(privKey.length);
     /* LEEMOS LLAVE Y ARCHIVO CIFRADO */
     var key1=filestr.readFileSync(pathP+c1c);
     console.log(key1);
     console.log(key1.length);
     var key2=filestr.readFileSync(pathP+c2c);
     console.log(key2);
     console.log(key2.length);
     //var mac2=fs.readFile("./",name3).toString();
     var cd2=fs.readFile(pathP,arcC);
     var mres="SxULAFwTWVcksl0q/WOfzRU8+0hZuI4CwoXhLOZl5vo=";
     var decipheredKeyC= rsa.privateDecryption(privKey, key1, 'rocanroll');
     var decipheresKeyM = rsa.privateDecryption(privKey, key2, 'rocanroll');
     console.log(decipheredKeyC);
     console.log(decipheresKeyM);
     //console.log("key2",key2);
     /* COMPROBAMOS MAC */
     //Read cipher data
     var message=filestr.readFileSync(pathP+arcC).toString();
     
     if(mac.verifyMac(message, decipheresKeyM.toString(), mres))
         console.log("MAC verificada");
     else
         console.log("ERROR EN MAC");
 
     /* DECIFRAMOS ARCHIVO */
     //console.log(cd2.length);
     var result=cipher.decipherFile(cd2,decipheredKeyC.toString());
     fs.createFile("./",namep,result);
}
enServidor();