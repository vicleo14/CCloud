import * as crypto from 'crypto';
import {IRSA} from './IRSA';

export class RSA implements IRSA
{
	publicEncryption(publicKey:string, message:string){
		var pub_enc = crypto.publicEncrypt({
			key: publicKey,
			padding: crypto.constants.RSA_PKCS1_PADDING
			}, Buffer.from(message,"base64"));
			var pubencS=pub_enc.toString("base64");
		return pubencS;
	}

	publicDecryption(publicKey:string, message:string):string{
		var pub_dec = crypto.publicDecrypt({
			key:publicKey,
			padding: crypto.constants.RSA_PKCS1_PADDING
			}, Buffer.from(message,"base64"));
			var pubedecS=pub_dec.toString("base64");
		return pubedecS;
	}

	privateEncryption(privateKey:string, message:string, cipherPhrase:string):string{
		var priv_enc = crypto.privateEncrypt({
			key: privateKey,
			padding: crypto.constants.RSA_PKCS1_PADDING,
			passphrase: cipherPhrase
			}, Buffer.from(message,"base64"));
			var privedecS=priv_enc.toString("base64");
		return privedecS;
	}

	privateDecryption(privateKey:string, message:string, cipherPhrase:string):string{
		var priv_dec = crypto.privateDecrypt({
		    key: privateKey,
		    passphrase: cipherPhrase,
		    padding: crypto.constants.RSA_PKCS1_PADDING
			}, Buffer.from(message,"base64"));
			var privdecS=priv_dec.toString("base64");
	    return privdecS; 
	}
} 