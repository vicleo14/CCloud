import * as crypto from 'crypto';
import {IRSA} from './IRSA';

export class RSA implements IRSA
{
	publicEncryption(publicKey:string, message:string):Buffer{
		var buf = Buffer.from(message);
		console.log(buf.length);
		var pub_enc = crypto.publicEncrypt({
			key: publicKey,
			padding: crypto.constants.RSA_PKCS1_PADDING
			}, buf);
		return pub_enc;
	}

	publicDecryption(publicKey:string, message:Buffer):string{
		var pub_dec = crypto.publicDecrypt({
			key:publicKey,
			padding: crypto.constants.RSA_PKCS1_PADDING
			}, message);
		return pub_dec.toString();
	}

	privateEncryption(privateKey:string, message:string, cipherPhrase:string):Buffer{
		var buf = Buffer.from(message);
		var priv_enc = crypto.privateEncrypt({
			key: privateKey,
			padding: crypto.constants.RSA_PKCS1_PADDING,
			passphrase: cipherPhrase
			}, buf);
		return priv_enc;
	}

	privateDecryption(privateKey:string, message:Buffer, cipherPhrase:string):string{
		var priv_dec = crypto.privateDecrypt({
		    key: privateKey,
		    passphrase: cipherPhrase,
		    padding: crypto.constants.RSA_PKCS1_PADDING
		    }, message);
	    return priv_dec.toString(); 
	}
} 