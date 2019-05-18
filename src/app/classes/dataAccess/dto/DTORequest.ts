export class DTORequest
{
    //private user:string;
    private idFile:string;
    private idKeyType:number;
    private codeDate: Date;
    private code:number;
    private state:number;
    constructor()
    {

    }
    /* SETTERS */
    public setIdFile(idFile:number)
    {
        this.idFile=idFile;
    }
    public setIdKeyType(idKeyType:number)
    {
        this.idKeyType=idKeyType;
    }
    public setCodeDate(codeDate: Date)
    {
        this.codeDate=codeDate;
    }
    public setCode(code:number)
    {
        this.code=code;
    }
    public setState(state:number)
    {
        this.state=state;
    }
    /* GETTERS */
    public getIdFile()
    {
        return this.idFile;
    }
    public getIdKeyType()
    {
        return this.idKeyType;
    }
    public getCodeDate()
    {
        return this.codeDate;
    }
    public getCode()
    {
        return this.code;
    }
    public getState()
    {
        return this.state;
    }
}