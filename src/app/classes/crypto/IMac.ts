export interface IMac{
	calculateMac(message: string, key: string): string;
	verifyMac(message: string, key: string, tag: string): boolean;
}