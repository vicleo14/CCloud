export interface IRSA
{
	publicEncryption(publicKey:string, message:Buffer):Buffer;
	publicDecryption(publicKey:string, message:Buffer):Buffer;
	privateEncryption(privateKey:string, message:Buffer, cipherPhrase:string):Buffer;
	privateDecryption(privateKey:string, message:Buffer, cipherPhrase:string):Buffer;
}