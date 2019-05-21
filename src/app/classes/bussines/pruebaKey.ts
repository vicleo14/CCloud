import {IRSA} from "../crypto/IRSA";
import {RSA} from "../crypto/RSA";
import {IRSAKeyGenerator} from "../crypto/IRSAKeyGenerator";
import {RSAKeyGenerator} from "../crypto/RSAKeyGenerator";

import {IMac} from "../crypto/IMac";
import {HMac} from "../crypto/HMac";

const fs= require('fs');

function main(){
	const mac:IMac=new HMac();
	const key:string="soga";
	var tao:string= mac.calculateMac("To make you feel my love", key);
	var pubKey = fs.readFileSync("../publicKey.txt");
	var privKey = fs.readFileSync("../privateKey.txt");
	var rsa:IRSA = new RSA();
	var bufKey = Buffer.from(key);
	var cipheredKeyMAC = rsa.publicEncryption(pubKey, bufKey);
	var decipheredMAC = rsa.privateDecryption(privKey, cipheredKeyMAC, 'camaleon');
	//var decodedMAC:string = decipheredMAC.toString();
	console.log(cipheredKeyMAC.toString());
	console.log(decipheredMAC.toString());
}
main();