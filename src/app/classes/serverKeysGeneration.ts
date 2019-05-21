import {IRSAKeyGenerator} from './crypto/IRSAKeyGenerator';
import {RSAKeyGenerator} from './crypto/RSAKeyGenerator';
import {IRSA} from './crypto/IRSA';
import {RSA} from './crypto/RSA';

const fs = require('fs');

function main(){
    var keyGen:IRSAKeyGenerator = new RSAKeyGenerator();
    var rsa:IRSA =new RSA();
    var publicKey:string, privateKey:string;
    var keys:string[];
    keys = keyGen.generateKeys('camaleon');
    publicKey = keys[0];
    privateKey = keys[1];

    //Original file reader
    fs.appendFileSync('publicKey.txt', publicKey);
    fs.appendFileSync('privateKey.txt', privateKey);
}

main();