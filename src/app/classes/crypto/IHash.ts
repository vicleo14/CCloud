export interface IHash{
	calculateHash(message: string): string;
	compareHash(message:string, hash:string): boolean;
}	
