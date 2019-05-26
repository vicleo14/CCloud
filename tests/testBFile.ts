import {BFile} from "../src/app/classes/bussines/BFile";

import { AES256 } from "../src/app/classes/crypto/AES256";
import { IBlockCipher } from "../src/app/classes/crypto/IBlockCipher";
import { RandomGenerator } from "../src/app/classes/crypto/RandomGenerator";
import { IRandomGenerator } from "../src/app/classes/crypto/IRandomGenerator";
import {CryptoConstants} from "../src/app/classes/utils/CryptoConstants";

import {IRSA} from "../src/app/classes/crypto/IRSA";
import {RSA} from "../src/app/classes/crypto/RSA";

import {IMac} from "../src/app/classes/crypto/IMac";
import {HMac} from "../src/app/classes/crypto/HMac"; 

import {IHash} from "../src/app/classes/crypto/IHash";
import {SHA256} from "../src/app/classes/crypto/SHA256";

import * as fs from 'fs';

function main(){
	var random_gen:IRandomGenerator = new RandomGenerator();
	var aes:IBlockCipher = new AES256();
	var mac:IMac = new HMac();
	var hash:IHash = new SHA256();
	var rsa:IRSA = new RSA();
	var bFile:BFile = new BFile();

	//Constants
	const nickname = "memo";
	const fileName = "Ensayo. Un final Perfecto.pdf";

	//File's encryption
	var file = fs.readFileSync(fileName);
	var key = random_gen.generateRandom(CryptoConstants.AES_KEYSIZE_BYTES);
	var cfile = aes.cipher(file.toString(), key);

	//Calculating MAC
	var keyMac = random_gen.generateRandom(CryptoConstants.AES_KEYSIZE_BYTES);
	var mac_calc = mac.calculateMac(cfile, keyMac);

	//Obtaining public key
	var publicKey = fs.readFileSync("../local/publicKey.txt").toString();
	//Encrypting keys
	var cipheredKeyFile = rsa.publicEncryption(publicKey, cfile);
	var cipheredKeyMac = rsa.publicEncryption();

	bFile.uploadFile()
}

main();