export class DTOContact
{
    private contact:string;
    private type:number;

    /*GETTERS*/
    public getContact():string
    {
        return this.contact;
    }
    public getType():number
    {
        return this.type;
    }
    /*SETTERS*/
    public setContact(contact:string)
    {
        this.contact=contact;
    }
    public setContatType(type:number)
    {
        this.type=type;
    }
}