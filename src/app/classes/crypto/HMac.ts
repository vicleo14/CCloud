import * as crypto from 'crypto';
import {IMac} from "./IMac";

export class HMac implements IMac
{
	public calculateMac(message: string, key: string): string
	{
		var tag: string;
		const hmac = crypto.createHmac('sha256', key);
		hmac.update(message);
		tag = hmac.digest('base64');
		return tag;
	}

	public verifyMac(message: string, key: string, tag: string): boolean
	{
		var tagp:string = this.calculateMac(message, key);
		return (tag === tagp)?true:false;
	}

	/*public calculateMacBuf(message: Buffer, key: Buffer): string
	{
		var tag: string;
		const hmac = crypto.createHmac('sha256', key.toString());
		hmac.update(message.toString());
		tag = hmac.digest('base64');
		return tag;	
	}

	public verifyMacBuf(message: Buffer, key: Buffer, ): boolean
	{

	}*/
}