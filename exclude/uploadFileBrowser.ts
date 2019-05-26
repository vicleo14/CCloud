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
window.uploadFile=function(file)
{
    {
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
            var mres = mac.calculateMac(cipheredData.toString("base64"), keyM);
            /* CALCULAMOS HASH DE LLAVES */
            var hashK = hash.calculateHash(keyC);
            var hashm = hash.calculateHash(keyM);
            /* CIFRAMOS LLAVES CON RSA */
            //Se cifran con la llave publica la llave de la mac y la llave del archivo
            //La llave pubilca es pedida como global cuando se acccede a la pagina
            var cipheredKeyM = rsa.publicEncryption(pubKey, keyM);
            var cipheredKeyC = rsa.publicEncryption(pubKey.toString(), keyC);
            var tagMacE = document.getElementById("macTagView");
            tagMacE.innerHTML = "Tag de MAC:" + mres;
            window.infoContainer = {
                "name": file[0].name,
                "mac": mres,
                "hashK": hashK,
                "hashM": hashm,
                "AESkey": cipheredKeyC,
                "macKey": cipheredKeyM,
                "data": cipheredData.toString("base64"),
                "nickname":"vicleo16",
                "size":cipheredData.length
            };
            console.log(">>>>>key1 deciphered:\n", keyC);
            console.log(">>>>>key2 deciphered:\n", keyM);
            console.log(">>>>>K1 ciphered:\n", cipheredKeyC);
            console.log(">>>>>K2 ciphered:\n", cipheredKeyM);

            console.log("File size:",cipheredData.length);
            console.log("Ciphered file:",cipheredData);
        };
        reader.readAsBinaryString(fileS);
    }
}