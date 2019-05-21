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
var name1="cipheredData"+ExtensionConstants.GENERIC_EXTENSION;
var name2="key"+ExtensionConstants.CIPHERKEYD_EXTENSION;
var name3="mac"+ExtensionConstants.MACKEYD_EXTENSION;
var namep="can.mp3";
var pathP="../";
function sendForm()
{
    
    var hash:IHash=new SHA256();
    
    /* Obtenemos campos */
    var p1=document.getElementById("p").value;
    var p2=document.getElementById("rp").value;
    if(p1==p2)
    {
        var phash=hash.calculateHash(p1);
        p1.value=phash;
        p2.value=phash;
        
    }
    else
    {
        alert("Las contraseñas no coinciden");
    }
}