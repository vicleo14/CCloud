export class DTOFileInfo
{
    private id:number;
    private cipheredName:string;
    private decipheredName:string;
    private mac:string;
    private size:number;
    private date:Date;
    private users:string[];

    constructor()
    {
        this.users= new Array();
    }
    /*ADD USER */
    public addUser(user:string)
    {
        this.users.push(user);
    }
    /* GETTERS */
    public getId():number
    {
        return this.id;
    }
    public getCipheredName():String
    {
        return this.cipheredName;
    }
    public getDecipheredName():String
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
    public getUsers():string[]
    {
        return this.users;
    }
    /* SETTERS */
    public setId(id:number)
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
    public setUsers(users:string[])
    {
        this.users=users;
    }
}