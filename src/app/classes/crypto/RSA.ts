import * as crypto from 'crypto';
import {IRSA} from './IRSA';

export class RSA implements IRSA
{
	publicEncryption(publicKey:string, message:Buffer):Buffer{
		var pub_enc = crypto.publicEncrypt({
			key: publicKey,
			padding: crypto.constants.RSA_PKCS1_PADDING
			}, message);
		return pub_enc;
	}

	publicDecryption(publicKey:string, message:Buffer):Buffer{
		var pub_dec = crypto.publicDecrypt({
			key:publicKey,
			padding: crypto.constants.RSA_PKCS1_PADDING
			}, message);
		return pub_dec;
	}

	privateEncryption(privateKey:string, message:Buffer, cipherPhrase:string):Buffer{
		var priv_enc = crypto.privateEncrypt({
			key: privateKey,
			padding: crypto.constants.RSA_PKCS1_PADDING,
			passphrase: cipherPhrase
			}, message);
		return priv_enc;
	}

	privateDecryption(privateKey:string, message:Buffer, cipherPhrase:string):Buffer{
		var priv_dec = crypto.privateDecrypt({
		    key: privateKey,
		    passphrase: cipherPhrase,
		    padding: crypto.constants.RSA_PKCS1_PADDING
		    }, message);
	    return priv_dec; 
	}
} 