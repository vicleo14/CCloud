"use strict";
exports.__esModule = true;
var RSA_1 = require("../crypto/RSA");
var HMac_1 = require("../crypto/HMac");
var fs = require('fs');
function main() {
    var mac = new HMac_1.HMac();
    var key = "soga";
    var tao = mac.calculateMac("To make you feel my love", key);
    var pubKey = fs.readFileSync("../publicKey.txt");
    var privKey = fs.readFileSync("../privateKey.txt");
    var rsa = new RSA_1.RSA();
    var bufKey = Buffer.from(key);
    var cipheredKeyMAC = rsa.publicEncryption("MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAzZjDXSBTrtfZyh+1iNaW5NE/0+4MwrU9SNXxGDaFa111MT9TnwDFQDX8YapK4C/4moZ+734ftYPCWzlIHiwG/k89FfNld1xp+pvrwJDTQ2qCxyj4a3JerheeHa4J8pj7sKnp3O/rR8WflWJ4ds7JiGvd6gFz1qFaYc1QmDO/3EqLw37giOLSdgo+ZVdZql10fYYvGjyjni3EV8+gxYU1YG1hn88Xn6B6a7YJvxAiMgj70LNwZZGk8cbqx+whewMgrXwE9tqvKymwBckR42ywlMZn3Pv0yvmyq7gD2aJb+wdGG42WpCwNA2OzKPv+ycOQ38pMbNScqm9qTwsHoPyf/MqSNc+dd9wDBLIrnZjnvME78eOijIahGv+ZLWgM7suMbZq6ixyV6mgbnDEmSpzijw3m3sKTTmizAlcDpRKhaSrYtoz+6BCdUr9p4N/OVlUmTfEARJ0P2rcDSZmLfvXJJZX8ve0LiYN3tackfGwQRC3z/DZ2yaU9T66ZT/SRhvOLHJJtiLkYqkjHUrna0yjcLnxMQ+d7GxRsla8sz1wEbtHZiGc0Rm2iA2x13kMKHjrp4xT8jfFo7/728m8wHZhcdlEgdhb3kYpsrXosk4EvNKIgp1WmdqIgd48cyuUcj+qQgrGfrK3R7f42QBrBmluxtVjdQnZjuQheXTjU6RXjyn8CAwEAAQ==", bufKey);
    console.log('cifrado');
    var decipheredMAC = rsa.privateDecryption(privKey, cipheredKeyMAC, 'camaleon');
    //var decodedMAC:string = decipheredMAC.toString();
    console.log(cipheredKeyMAC.toString());
    console.log(decipheredMAC.toString());
}
main();
