export interface IBlockCipher
{
    cipher(data:string,key:string):string;
    decipher(data:string,key:string):string;
}