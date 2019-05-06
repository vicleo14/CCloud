export class DTOUser
{
    private curp :string;
	private name :string;
	private lastname_a :string;
	private lastname_b :string;
	private birthday: Date;
	private role :number;
	private nickname :string;
	private hash_password :string;
	private active:boolean;
    private contact :string[];
    constructor(){}
    //GETTERS
    public getCurp():string
    {
        return this.curp;
    }
    public getName():string
    {
        return this.name;
    }
    public getLastNameA():string
    {
        return this.lastname_a;
    }
    public getLastNameB():string
    {
        return this.lastname_b;
    }
    public getBirthday():Date
    {
        return this.birthday;
    }
    public getRole():number
    {
        return this.role;
    }
    public getNickname():string
    {
        return this.nickname;
    }
    public getHashPassword():string
    {
        return this.hash_password;
    }
    public isActive():boolean
    {
        return this.active;
    }
    public getContacts():string[]
    {
        return this.contact;
    }

    //SETTERS
    public setCurp(curp:string):void
    {
        this.curp=curp;
    }
    public setName(name:string):void
    {
        this.name=name;
    }
    public setLastNameA(lastNameA:string)
    {
        this.lastname_a=lastNameA;
    }
    public setLastNameB(lastNameB:string)
    {
        this.lastname_b=lastNameB;
    }
    public setBirthday(birthday:Date)
    {
        this.birthday=birthday;
    }
    public setRole(role:number)
    {
        this.role=role;;
    }
    public setNickname(nickname:string)
    {
        this.nickname=nickname;
    }
    public setHashPassword(hpassword:string)
    {
        this.hash_password=hpassword;
    }
    public setActive(active: boolean)
    {
        this.active=active;
    }
    public setContacts(contactList:string[])
    {
        console.log(contactList);
        this.contact=contactList;
    }
}
