import { AES256 } from "../src/app/classes/crypto/AES256";
import { IBlockCipher } from "../src/app/classes/crypto/IBlockCipher";
import { RandomGenerator } from "../src/app/classes/crypto/RandomGenerator";
import { IRandomGenerator } from "../src/app/classes/crypto/IRandomGenerator";
import {CryptoConstants} from "../src/app/classes/utils/CryptoConstants";
import {ExtensionConstants} from "../src/app/classes/utils/ExtensionConstants";
import {KeyConstants} from "../src/app/classes/utils/KeyConstants";
import {IHash} from "../src/app/classes/crypto/IHash";
import {SHA256} from "../src/app/classes/crypto/SHA256";
import {IMac} from "../src/app/classes/crypto/IMac";
import {HMac} from "../src/app/classes/crypto/HMac";
import {IDAOFileData} from "../src/app/classes/dataAccess/dao/IDAOFileData";
import {FSDAOFileData} from "../src/app/classes/dataAccess/dao/FSDAOFileData";
import {IRSA} from '../src/app/classes/crypto/IRSA';
import {RSA} from '../src/app/classes/crypto/RSA';
import {IDAOFileInfo} from "../src/app/classes/dataAccess/dao/IDAOFileInfo";
import {IDAOKey} from "../src/app/classes/dataAccess/dao/IDAOKey";
import {MDBDAOFileInfo} from "../src/app/classes/dataAccess/dao/MDBDAOFileInfo";
import {MDBDAOKey} from "../src/app/classes/dataAccess/dao/MDBDAOKey";
import {DTOKey} from "../src/app/classes/dataAccess/dto/DTOKey";
import {DTOFileInfo} from "../src/app/classes/dataAccess/dto/DTOFileInfo";
import * as dateFormat from "dateformat";
var name1="cipheredData"+ExtensionConstants.GENERIC_EXTENSION;
var name2="key"+ExtensionConstants.CIPHERKEYC_EXTENSION;
var name3="mac"+ExtensionConstants.MACKEYC_EXTENSION;
var namep="pruebaIMG.png";
var pathP="./";
var pathOut="../storage/";
const filestr = require('fs');
function uploadFile(/*file*/)
{
    var cipher:IBlockCipher=new AES256();
    var generator:IRandomGenerator=new RandomGenerator();
    var mac:IMac=new HMac();
    var hash:IHash=new SHA256();
    var fs:IDAOFileData=new FSDAOFileData();
    var rsa:IRSA=new RSA();
    
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

    

    //Se obtienen las llaves RSA anteriormente creadas
    var pubKey = filestr.readFileSync("./publicKey.txt");

    //Se cifran con la llave pública la llave de la mac y la llave del archivo
    var cipheredKeyM = rsa.publicEncryption(pubKey.toString(), Buffer.from(keyM));
    var cipheredKeyC = rsa.publicEncryption(pubKey.toString(), Buffer.from(keyC));
    console.log(cipheredKeyM);
    console.log(cipheredKeyC);
    /* GENERAMOS ARCHIVOS DE LLAVES Y DOC CIFRADO */
    fs.createFile(pathOut,name1,cipheredData);
    fs.createFile(pathOut,name2,cipheredKeyC);
    fs.createFile(pathOut,name3,cipheredKeyM);
   
    /*const options = {  
        url: 'localhost',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'my-reddit-client'
        }
    };*/
    /*var request = require('request');
    request('localhost:3030', function (req, res) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var prueba = {
          name: 'name',
          data: 'file',
          MAC: 'mac'
      }
      res.end(JSON.stringify(prueba));
    });*/
}

//uploadFile();
async function f1()
{
    var cipher:IBlockCipher=new AES256();
    var generator:IRandomGenerator=new RandomGenerator();
    var mac:IMac=new HMac();
    var hash:IHash=new SHA256();
    var fs:IDAOFileData=new FSDAOFileData();
    var rsa:IRSA=new RSA();
    var nombreArchivo="pruebaPDF.pdf";
    var split=nombreArchivo.split(".");
    var user="memo1";
    var nomArcG=user+split[0]+dateFormat( new Date(),"yyyyMMddhhMMss");
    var clave=nomArcG;
    var nomMAC=nomArcG+ExtensionConstants.MACKEYC_EXTENSION;
    var nomKey=nomArcG+ExtensionConstants.CIPHERKEYC_EXTENSION;
    /* GENERAMOS CLAVES */
    var keyC=generator.generateRandom(CryptoConstants.AES_KEYSIZE_BYTES);
    var keyM=generator.generateRandom(CryptoConstants.AES_KEYSIZE_BYTES);

    /* CALCULAMOS HASH DE LAS LLAVES */
    var hkey1=hash.calculateHash(keyC);
    var hkey2=hash.calculateHash(keyM);

    /* LEEMOS ARCHIVO */
    var data=fs.readFile(pathP,nombreArchivo);

    /* CIFRAMOS  */
    var cipheredData=cipher.cipherFile(data,keyC);

    /* CALCULAMOS MAC */
    var mres=mac.calculateMac(cipheredData.toString(),keyM);

    //Se obtienen las llaves RSA anteriormente creadas
    var pubKey = filestr.readFileSync("./publicKey.txt");
    
    //Se cifran con la llave pública la llave de la mac y la llave del archivo
    var cipheredKeyM = rsa.publicEncryption(pubKey.toString(), Buffer.from(keyM));
    var cipheredKeyC = rsa.publicEncryption(pubKey.toString(), Buffer.from(keyC));
    //Almacenamos en HDD
    var name1=nomArcG+ExtensionConstants.GENERIC_EXTENSION;
    fs.createFile(pathOut,name1,cipheredData);
    fs.createFile(pathOut,nomKey,cipheredKeyC);
    fs.createFile(pathOut,nomMAC,cipheredKeyM);

    //Almacenamos en BD
    var dtoFile:DTOFileInfo=new DTOFileInfo();
    dtoFile.setId(clave);
    dtoFile.setDecipheredName(nombreArchivo);
    dtoFile.setCipheredName(name1);
    dtoFile.setMAC(mres);
    dtoFile.setDate(new Date());
    dtoFile.setSize(data.length);
    var dtoK1:DTOKey=new DTOKey();
    dtoK1.setIdFile(clave);
    dtoK1.setIdType(KeyConstants.KEY_CIPHER_DECIPHER);
    dtoK1.setKeyFileName(nomKey);
    dtoK1.setKeyHash(hkey1);

    var dtoK2:DTOKey=new DTOKey();
    dtoK2.setIdFile(clave);
    dtoK2.setIdType(KeyConstants.KEY_INTEGRITY);
    dtoK2.setKeyFileName(nomMAC);
    dtoK2.setKeyHash(hkey2);

    //DAOS

    var daoFile:IDAOFileInfo=new MDBDAOFileInfo();
    var daoKey:IDAOKey=new MDBDAOKey();
    await daoFile.createFile(user,dtoFile);
    await daoKey.createKey(dtoK1);
    await daoKey.createKey(dtoK2);
    
}
async function buscarPorUsuario(user)
{
    var daoFiles:IDAOFileInfo=new MDBDAOFileInfo();
    var results=await daoFiles.findFilesByUser(user);
    console.log("Results:",results);
    return results;
}
function cifrarRSA()
{
    var rsa:IRSA=new RSA();
    var pubKey = filestr.readFileSync("./publicKey.txt");
    var privKey = filestr.readFileSync("../local/privateKey.txt").toString();
    //console.log("Private",privKey.toString());
    //var cipheredKeyM = rsa.publicEncryption(publicKey, Buffer.from("RHCrigsEq4tdoZ6XMnVMtQclEB1JQ5T4","base64"));
    var cipheredKeyM = rsa.publicEncryption(pubKey, "aY5UeE0Thc1thwU82UkAXcbu4z8PFxnS");
    var decipheredKeyM = rsa.privateDecryption(privKey, cipheredKeyM, 'rocanroll');
    console.log("Ciphered",cipheredKeyM);
    console.log("Deciphered",decipheredKeyM);
    //console.log("SIZE:",cipheredKeyM.length);
}
//buscarPorUsuario("vicleo16");

cifrarRSA();
//f1();