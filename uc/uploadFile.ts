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
var name1="cipheredData"+ExtensionConstants.GENERIC_EXTENSION;
var name2="key"+ExtensionConstants.CIPHERKEYD_EXTENSION;
var name3="mac"+ExtensionConstants.MACKEYD_EXTENSION;
var namep="ArquitecturaComputadoras.PDF";
var pathP="./";
const filestr = require('fs');
function uploadFile(/*file*/)
{
    var cipher:IBlockCipher=new AES256();
    var generator:IRandomGenerator=new RandomGenerator();
    var mac:IMac=new HMac();
    var hash:IHash=new SHA256();
    var fs:IDAOFileData=new FSDAOFileData();
    var rsa:IRSA=new RSA();
    //var reader=new FileReader();

    //reader.readAsArrayBuffer();

    
    /* GENERAMOS VALORES ALEATORIOS */
    
    var keyC=generator.generateRandom(CryptoConstants.AES_KEYSIZE_BYTES);
    var keyM=generator.generateRandom(CryptoConstants.AES_KEYSIZE_BYTES);

    /* LEEMOS ARCHIVO */
    var data=fs.readFile(pathP,namep);
    //console.log(data);
    //console.log("key1",keyC);
    /* CIFRAMOS  */
    var cipheredData=cipher.cipherFile(data,keyC);
    //console.log(cipheredData);
    /* CALCULAMOS MAC */
    var mres=mac.calculateMac(cipheredData.toString(),keyM);
    console.log("MAC:",mres);

    /* GENERAMOS ARCHIVOS DE LLAVES Y DOC CIFRADO */
    fs.createFile("./",name1,cipheredData);
    fs.createFile("./",name2,keyC);
    fs.createFile("./",name3,keyM);

    //Se obtienen las llaves RSA anteriormente creadas
    var pubKey = filestr.readFileSync("./publicKey.txt");
    var privKey = filestr.readFileSync("./privateKey.txt");
    //var pub = pubKey.slice(26, pubKey.length-25);
    //Se cifran con la llave pública la llave de la mac y la llave del archivo
    var cipheredKeyM = rsa.publicEncryption(pubKey.toString(), keyM);
    var cipheredKeyC = rsa.publicEncryption(pubKey.toString(), keyC);
    console.log(cipheredKeyM);
    console.log(cipheredKeyC);

    fs.createFile("./","cipheredKeyM.txt",cipheredKeyM);
    fs.createFile("./","cipheredKeyC.txt",cipheredKeyC);
}

uploadFile();