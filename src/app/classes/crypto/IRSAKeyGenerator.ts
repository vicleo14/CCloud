export interface IRSAKeyGenerator
{
	generateKeys(cipherPhrase:string):string[];
}