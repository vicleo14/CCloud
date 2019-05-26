// openssl genrsa -out certs/server/my-server.key.pem 2048
// openssl rsa -in certs/server/my-server.key.pem -pubout -out certs/client/my-server.pub
 
'use strict';
 
var fs = require('fs'), ursa = require('ursa'), crt, key, msg;
 
key = ursa.createPrivateKey(fs.readFileSync('./certs/server/my-server.key.pem'));
crt = ursa.createPublicKey(fs.readFileSync('./certs/client/my-server.pub'));
 
console.log('Encrypt with Public');
msg = crt.encrypt("Everything is going to be 200 OK", 'utf8', 'base64');
console.log('encrypted', msg, '\n');
 
console.log('Decrypt with Private');
msg = key.decrypt(msg, 'base64', 'utf8');
console.log('decrypted', msg, '\n');
 
console.log('############################################');
console.log('Reverse Public -> Private, Private -> Public');
console.log('############################################\n');
 
console.log('Encrypt with Private (called public)');
msg = key.privateEncrypt("Everything is going to be 200 OK", 'utf8', 'base64');
console.log('encrypted', msg, '\n');
 
console.log('Decrypt with Public (called private)');
msg = crt.publicDecrypt(msg, 'base64', 'utf8');
console.log('decrypted', msg, '\n');