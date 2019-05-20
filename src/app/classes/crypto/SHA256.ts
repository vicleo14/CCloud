import * as crypto from 'crypto';

import { IHash } from "./IHash";

export class SHA256 implements IHash
{
    calculateHash(message: string): string
    {
        var tao:string;
        const hash = crypto.createHash('sha256');
		hash.update(message);
		tao=hash.digest('base64')
		return tao;
    }
    compareHash(message:string, hash:string): boolean
    {
        var taop:string=this.calculateHash(message);
        return (taop===hash)?true:false;
    }
}