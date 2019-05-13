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
     cipherFile(data:Buffer,key:string):Buffer
    {
        var iv=this.ivGenerator.generateRandom(CryptoConstants.AES_IVSIZE_BYTES);
        var buf_iv = Buffer.from(iv);
        const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);
        var buf_d = cipher.update(data);
        var buf_d2 = cipher.final();
        const totLength = buf_d.length + buf_d2.length + buf_iv.length;
        var encrypted = Buffer.concat([buf_iv, buf_d, buf_d2], totLength);
        return encrypted;
    }
    
    decipherFile(data:Buffer,key:string):Buffer
    {
        var buf_iv = Buffer.alloc(CryptoConstants.AES_IVSIZE_BYTES);
        data.copy(buf_iv, 0, 0, CryptoConstants.AES_IVSIZE_BYTES);
        const decipher = crypto.createDecipheriv(this.ALGORITHM, key, buf_iv);
        var content = Buffer.alloc(data.length-CryptoConstants.AES_IVSIZE_BYTES);
        data.copy(content, 0, CryptoConstants.AES_IVSIZE_BYTES, data.length);
        var buf_d = decipher.update(content);
        var buf_d2 = decipher.final();
        const totLength = buf_d.length + buf_d2.length;
        var decrypted = Buffer.concat([buf_d, buf_d2], totLength);
        return decrypted;
    }
}