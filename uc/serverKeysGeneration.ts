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
    keys = keyGen.generateKeys('rocanroll');
    publicKey = keys[0];
    privateKey = keys[1];

    //Original file reader
    fs.appendFileSync('publicKey.txt', publicKey);
    fs.appendFileSync('privateKey.txt', privateKey);
}

main();