import {BKey} from "./BKey";
import * as fs from 'fs';

async function keyObfuscation(){
	var ofuscar:BKey=new BKey();
	var privateKey = fs.readFileSync("privateKey.txt").toString();
	await ofuscar.ofuscar(privateKey, 155);
}

/*async function keyDesobfuscation(){
	var ofuscar:BKey=new BKey();
	var des=await ofuscar.desofuscar(155);
	console.log(des);
}*/

keyObfuscation();
