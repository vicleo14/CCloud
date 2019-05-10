import * as crypto from 'crypto';
import { IBlockCipher } from './IBlockCipher';
import {RandomGenerator} from './RandomGenerator';
import {IRandomGenerator} from './IRandomGenerator';
import {CryptoConstants} from "../utils/CryptoConstants";
export  class AES256 implements IBlockCipher{
    private readonly ALGORITHM = 'aes-256-cbc';
    private readonly OPERATION="cbc";
    private ivGenerator:IRandomGenerator;
    constructor()
    {
        this.ivGenerator=new RandomGenerator();
    }
    cipher(data:string,key:string):string
    {
        var iv=this.ivGenerator.generateRandom(CryptoConstants.AES_IVSIZE_BYTES);
        const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);
        let encrypted = cipher.update(data, 'ascii', 'hex');
        encrypted += cipher.final('hex');
        console.log("IV",iv);
        return encrypted+iv;
    }
    
    decipher(data:string,key:string):string
    {
        var iv=data.substr(data.length-CryptoConstants.AES_IVSIZE_BYTES);
        data=data.substr(0,data.length-CryptoConstants.AES_IVSIZE_BYTES);

        const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
        let decrypted = decipher.update(data, 'hex', 'ascii');
        decrypted += decipher.final('ascii');
        return decrypted;
    }
}