export class DTOKey
{
    private idFile: string;
    private idType:number;
    private keyFileName:string;
    private keyHash:string;
    constructor(){}
    /* SETTERS */
    public setIdFile(idFile: number)
    {
        this.idFile=idFile;
    }
    public setIdType(idType:number)
    {
        this.idType=idType;
    }
    public setKeyFileName(keyFileName:string)
    {
        this.keyFileName=keyFileName;
    }
    public setKeyHash(keyHash:string)
    {
        this.keyHash=keyHash;
    }
    /* GETTERS */
    public getIdFile()
    {
        return this.idFile;
    }
    public getIdType()
    {
        return this.idType;
    }
    public getKeyFileName()
    {
        return this.keyFileName;
    }
    public getKeyHash()
    {
        return this.keyHash;
    }
}