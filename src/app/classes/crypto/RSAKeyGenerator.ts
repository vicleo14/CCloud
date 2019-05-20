import {generateKeyPairSync} from 'crypto';
import {IRSAKeyGenerator} from './IRSAKeyGenerator';

export class RSAKeyGenerator implements IRSAKeyGenerator
{
	generateKeys(cipherPhrase:string):string[]{
		const { publicKey, privateKey } = generateKeyPairSync('rsa', {
		  modulusLength: 4096,
		  publicKeyEncoding: {
		    type: 'spki',
		    format: 'pem'
		  },
		  privateKeyEncoding: {
		    type: 'pkcs8',
		    format: 'pem',
		    cipher: 'aes-256-cbc',
		    passphrase: cipherPhrase
		  }
		});
		var keys:string[] = [publicKey, privateKey];
		return keys;
	}
}