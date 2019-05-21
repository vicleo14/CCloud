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
var namep="a.png";
var pathP="../";
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
    var pubKey = filestr.readFileSync("./publicKey.txt").toString();
    var privKey = filestr.readFileSync("./privateKey.txt").toString();
    console.log(pubKey.length);
    console.log(privKey.length);
    //console.log(privKey);
    //var priv = privKey.slice(37, privKey.length-35);
    //console.log(priv);
     /* LEEMOS LLAVE Y ARCHIVO CIFRADO */
     var key2=filestr.readFileSync("./cipheredKeyM.txt");
     //var key2=fs.readFile("./",'cipheredKeyM');
     console.log(key2);
     console.log(key2.length);
     //var mac2=fs.readFile("./",name3).toString();
     var cd2=fs.readFile("./",'cipheredKeyC.txt');
     var mres="SxULAFwTWVcksl0q/WOfzRU8+0hZuI4CwoXhLOZl5vo=";
     var decipheredKeyM= rsa.privateDecryption(privKey, key2, 'rocanroll');
     var decipheresKeyC = rsa.privateDecryption(privKey, cd2, 'rocanroll');
     console.log(decipheredKeyM);
     console.log(decipheresKeyC);
     //console.log("key2",key2);
     /* COMPROBAMOS MAC */
     //Read cipher data
     var message=filestr.readFileSync("./cipheredData.gnf").toString();
     
     if(mac.verifyMac(message, decipheredKeyM, mres))
         console.log("MAC verificada");
     else
         console.log("ERROR EN MAC");
 
     /* DECIFRAMOS ARCHIVO */
     //console.log(cd2.length);
     //var result=cipher.decipherFile(cd2,key2);
     //fs.createFile("./",namep,result);
}
enServidor();