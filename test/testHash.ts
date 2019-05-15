import {IHash} from "../src/app/classes/crypto/IHash";
import {SHA256} from "../src/app/classes/crypto/SHA256";
function test()
{
    const sha256:IHash=new SHA256();
    const mensaje:string="admin";
    var tao:string=sha256.calculateHash(mensaje);
    console.log(tao);
    console.log(sha256.compareHash(mensaje,tao));
}

test();