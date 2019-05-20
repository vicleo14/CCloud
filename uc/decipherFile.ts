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
var name1="c.gnf";//"cipheredData"+ExtensionConstants.GENERIC_EXTENSION;
var name2="key.vmf";//"key"+ExtensionConstants.CIPHERKEYD_EXTENSION;
var name3="mac.drc";//"mac"+ExtensionConstants.MACKEYD_EXTENSION;
var namep="a.png";
var pathP="../";
function enServidor()
{
    console.log("ADVERTENCIA: LA MAC ESTA FIJA");
    var  cipher:IBlockCipher=new AES256();

    var generator:IRandomGenerator=new RandomGenerator();
    var mac:IMac=new HMac();
    var hash:IHash=new SHA256();
    var fs:IDAOFileData=new FSDAOFileData();
     /* LEEMOS LLAVE Y ARCHIVO CIFRADO */
     var key2=fs.readFile("./",name2).toString();
     //var mac2=fs.readFile("./",name3).toString();
     var cd2=fs.readFile("./",name1);
     var mres="JvPOcXt3nE7TFRQ57OgJX1r2JlK6mhjNOYOHoRPYN0o=";
     //console.log("key2",key2);
     /* COMPROBAMOS MAC */
     
     /*if(mac.verifyMac(cd2.toString(),mac2,mres))
         console.log("MAC verificada");
     else
         console.log("ERROR EN MAC");
 */
     /* DECIFRAMOS ARCHIVO */
     console.log(cd2.length);
     var result=cipher.decipherFile(cd2,key2);
     //fs.createFile("./",namep,result);
}
enServidor();