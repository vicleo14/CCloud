import * as crypto from 'crypto';
import { IRandomGenerator } from './IRandomGenerator';

export  class RandomGenerator implements IRandomGenerator
{
     generateRandom(size:number):string
    {       
        const buf = crypto.randomBytes(size);
        var key:string=buf.toString('base64').substr(0,size);
        return key;
    }
}