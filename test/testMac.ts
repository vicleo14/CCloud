import {IMac} from "../src/app/classes/crypto/IMac";
import {HMac} from "../src/app/classes/crypto/HMac";
function test()
{
    const mac:IMac=new HMac();
    const mensaje:string="Hola";
    const llave:string="gato";
    var tao:string= mac.calculateMac(mensaje, llave);
    console.log(tao);
    tao="lLSdPPLhLjt6Pv943wv4PygNUxus6Ce9z2qwO8l0kuM=";
    console.log(mac.verifyMac(mensaje, llave, tao));
}

test();