import {IRSAKeyGenerator} from '../src/app/classes/crypto/IRSAKeyGenerator';
import {RSAKeyGenerator} from '../src/app/classes/crypto/RSAKeyGenerator';
import {IRSA} from '../src/app/classes/crypto/IRSA';
import {RSA} from '../src/app/classes/crypto/RSA';

const fs = require('fs');

function main(){
    var keyGen:IRSAKeyGenerator = new RSAKeyGenerator();
    var rsa:IRSA =new RSA();
    var publicKey:string, privateKey:string;
    var keys:string[];
    keys = keyGen.generateKeys('camaleon');
    publicKey = keys[0];
    privateKey = keys[1];
    console.log(publicKey.length);
    console.log("\n");
    console.log(privateKey.length);

    //Original file reader
    var contenido = fs.readFileSync("Original/Canciones.txt");
    console.log(contenido.length);

    
    var priv_encrypt = rsa.privateEncryption(privateKey, contenido, 'camaleon');
    console.log(priv_encrypt);
    fs.appendFileSync('Encrypted/PrivateCanciones.txt', pub_decrypt);

    var pub_decrypt = rsa.publicDecryption(publicKey, priv_encrypt);
    fs.appendFileSync('Decrypted/PublicCanciones.txt', pub_decrypt);

    var pub_encrypt = rsa.publicEncryption(publicKey, contenido);
    console.log(pub_encrypt);
    fs.appendFileSync('Encrypted/PublicCanciones.txt', priv_decrypt);

    var priv_decrypt = rsa.privateDecryption(privateKey, pub_encrypt, 'camaleon');
    fs.appendFileSync('Decrypted/PrivateCanciones.txt', priv_decrypt);
}

main();