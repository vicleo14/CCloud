import {IHash} from "../src/app/classes/crypto/IHash";
import {SHA256} from "../src/app/classes/crypto/SHA256";
function test()
{
    const sha256:IHash=new SHA256();
    const mensaje:string="Hola";
    var tao:string=sha256.calculateHash(mensaje)
    tao="5jP0/Hm63qHcXblwzzl8gki6xHzDrPmRW6YLXXaw6I8=";
    console.log(sha256.compareHash(mensaje,tao));
}

test();