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
function uploadFile(file)
{
    {
        var publicKey="-----BEGIN PUBLIC KEY-----"+
        "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1jDb8HxsMWhf0Gh3Yzh7"+
        "O+SHeV/WsiGyKhKhYd1O5DZUUqgWRaVG8v8DIAQLzNc7QJx2nPFv/tBZ9tFCwfAL"+
        "xoua+xvHCl5JONzKLzirTpu5mUOtNBai58P3cyUopOQIxzAVwHxboY4LLR3ZSg8t"+
        "T609pBckZiRhL4LM0Gv3vjuJdrJkFpiF4I4keOSbDFoosgtnJewbYXFBbPSizL4i"+
        "gFmtk6SCUOFR504DEQDvpnFXyIIjoKHkFh44M3YqNKZglUii12QKRv1K+7Dj3Zb4"+
        "M4XOjKz4fjUeJnGGC+VP+YbakBeH/2D5l2oz62bv52B6+HgyNlzTx6Oqk4t74jUm"+
        "k7Je2oIzoI9dQjNullnfVdLHs0Rp7GCYQclsKtHr2aiz74D/ZyHKgmstuVGv8xuP"+
        "ZNnyfiVBOMbG8yxefUnrHNkRnxfv6jOXUA/ah3b3vFgb4uBq1cBlNlnYWX1y4mf8"+
        "oRAKab1K9NBZJ3mVpzW/qJjGI8Zbl7s0Uqlmn8FxgW13LNs4rtQWz5D01uJ6AqUh"+
        "jcIfaOg/HwEViwcfkantsfYTZV70X0+G2qHTFeUJOiLh3+YTLUHC/y44t1UlY38c"+
        "BJGhwgfFm8lqcIC734stsrMEk2GhTO8tjBUnBbOPT5u7OOUIVwt8b7h3RvBph9qt"+
        "KVcoV6mWkkQRPoKW7uI3o78CAwEAAQ=="+
        "-----END PUBLIC KEY-----";
        
    
        var cipher = new AES256();
        var generator = new RandomGenerator();
        var mac = new HMac();
        var hash = new SHA256();
        var fs = new FSDAOFileData();
        var rsa = new RSA();
        var reader = new FileReader();
        var fileS = file[0];
        reader.onload = function () {
            /* GENERAMOS VALORES ALEATORIOS */
            var keyC = generator.generateRandom(CryptoConstants.AES_KEYSIZE_BYTES);
            var keyM = generator.generateRandom(CryptoConstants.AES_KEYSIZE_BYTES);
            /* CIFRAMOS CON AES */
            var cipheredData = cipher.cipherFile(reader.result, keyC);
            /* CALCULAMOS TAG CON IMAC */
            var mres = mac.calculateMac(cipheredData.toString(), keyM);
            /* CALCULAMOS HASH DE LLAVES */
            var hashK = hash.calculateHash(keyC);
            var hashm = hash.calculateHash(keyM);
            /* CIFRAMOS LLAVES CON RSA */
            //Se cifran con la llave pública la llave de la mac y la llave del archivo
            var cipheredKeyM = rsa.publicEncryption(publicKey, Buffer.from(keyM, "base64"));
            var cipheredKeyC = rsa.publicEncryption(publicKey.toString(), Buffer.from(keyC, "base64"));
            console.log(keyC);
            console.log(keyM);
            console.log(mres);
            console.log(hashK);
            console.log(hashm);
           // console.log(cipheredData.toString());
            var ct=document.getElementById("ci");
            ct.value=cipheredData;  
            var tagMacE=document.getElementById("macTagView");
            tagMacE.value="Tag de MAC:"+tagMacE;
            console.log("RSAK1",cipheredKeyM.toString());
            console.log("RSAK2",cipheredKeyC.toString());
        };
        reader.readAsBinaryString(fileS);
    }
}