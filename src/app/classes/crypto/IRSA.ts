export interface IRSA
{
	publicEncryption(publicKey:string, message:string):Buffer;
	publicDecryption(publicKey:string, message:Buffer):string;
	privateEncryption(privateKey:string, message:string, cipherPhrase:string):Buffer;
	privateDecryption(privateKey:string, message:Buffer, cipherPhrase:string):string;
}