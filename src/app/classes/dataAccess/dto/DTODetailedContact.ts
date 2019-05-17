export class DTODetailedContact
{
    private contact:string;
    private type:string;
    private descrpition:string;

    /*GETTERS*/
    public getContact():string
    {
        return this.contact;
    }
    public getType():string
    {
        return this.type;
    }
    public getDescription():string
    {
        return this.descrpition;
    }
    /*SETTERS*/
    public setContact(contact:string)
    {
        this.contact=contact;
    }
}