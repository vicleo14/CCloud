export interface IRSA
{
	publicEncryption(publicKey:string, message:string):string;
	publicDecryption(publicKey:string, message:string):string;
	privateEncryption(privateKey:string, message:string, cipherPhrase:string):string;
	privateDecryption(privateKey:string, message:string, cipherPhrase:string):string;
}