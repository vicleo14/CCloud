export interface IBlockCipher
{
    cipher(data:string,key:string):string;
    decipher(data:string,key:string):string;
    cipherFile(data:Buffer,key:string):Buffer;
    decipherFile(data:Buffer,key:string):Buffer;
}