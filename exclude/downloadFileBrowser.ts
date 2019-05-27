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
window.uploadFile=function(files, numType)
{
    var reader = new FileReader();
    var fileS = files[0];
    reader.onload = function () 
    {
        var readed=reader.result;
        if (numType == 0) {
            window.cipherKey=readed;
            console.log("AES:",cipherKey);
        }
        else if (numType == 1) 
        {
            window.macKey=readed;
            console.log("MAC:",macKey);
        }
    }
    reader.readAsText(fileS);
}
window.verifykeys = function()
{
  console.log("INICIA VERIFY");
    var hash = new SHA256();  
    var infoKeys={
      id: fileID,
      hashKey:"",
      hashMac:""
    };
    //console.log(infoKeys);
    
    var petition=new XMLHttpRequest;
    var data=JSON.stringify(infoKeys);
    petition.open("POST","http://localhost:3000/key/findHashes");
    petition.setRequestHeader("Content-Type", "application/json");
    petition.send(data);
    petition.onreadystatechange=async function()
    {
      if(petition.readyState==4 )
      {
        var values=JSON.parse(petition.response);
        //console.log("Termina peticion servidor.Comenzando verificacion",values);
        petition.abort();
        if(hash.compareHash(macKey,values.hashMac) && hash.compareHash(cipherKey,values.hashKey))
        {
          //console.log("Verified. Begin download");
          alert("Great! Wait a moment while we recolect your file's data");
          await downloadData();
        }
        else
        {
          alert("Some of your keys is wrong. Please verify the files =)");
        }
        
      }
    }
}
async function downloadData()
{
  
  window.result=0;
  var cipher = new AES256();
  console.log("Begin download");

  var infoFile={
    id: fileID,
    dataFile:""
  };
  console.log(infoFile);
  var data=JSON.stringify(infoFile);
  var petition=new XMLHttpRequest;
  console.log(data);
  petition.open("POST","http://localhost:3000/user/download-file");
  petition.setRequestHeader("Content-Type", "application/json");
  petition.send(data);
  petition.onreadystatechange=async function()
  {
    if(petition.readyState==4 )
    {
      var fs=require("fs");
        var values=JSON.parse(petition.response);
        console.log("Termina peticion servidor.Comenzando decifrado",values);
        petition.abort();
        var cipheredData=values.dataFile;
        var buf=Buffer.from(cipheredData,"base64");
		    console.log(buf)
        result=await cipher.decipherFile(buf,cipherKey);
        console.log(result);
        console.log(result);
        var targetA=document.getElementById("downloadFile");
        targetA.classList.remove("disabled");
        document.getElementById("downloadFile").onclick=async function(code)
        {
          
          //console.log("Archivo escrito");
          this.href='data:image/png;base64,'+result; 
        };
    }
  }
}