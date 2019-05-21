export class DTOFileInfo
{
    private id:string;
    private cipheredName:string;
    private decipheredName:string;
    private mac:string;
    private size:number;
    private date:Date;

    constructor()
    {
        
    }
    /* GETTERS */
    public getId():string
    {
        return this.id;
    }
    public getCipheredName():string
    {
        return this.cipheredName;
    }
    public getDecipheredName():string
    {
        return this.decipheredName;
    }
    public getMAC():string
    {
        return this.mac;
    }
    public getSize():number
    {
        return this.size;
    }
    public getDate():Date
    {
        return this.date;
    }
    /* SETTERS */
    public setId(id:string)
    {
        this.id=id;
    }
    public setCipheredName(cipheredName:string)
    {
        this.cipheredName=cipheredName;
    }
    public setDecipheredName(decipheredName:string)
    {
        this.decipheredName=decipheredName;
    }
    public setMAC(mac:string)
    {
        this.mac=mac;
    }
    public setSize(size:number)
    {
        this.size=size;
    }
    public setDate(date:Date)
    {
        this.date=date;
    }
}