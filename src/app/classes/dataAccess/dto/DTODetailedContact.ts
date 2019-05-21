export class DTODetailedContact
{
    private contact:string;
    private type:string;
    private description:string;

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
        return this.description;
    }
    /*SETTERS*/
    public setContact(contact:string)
    {
        this.contact=contact;
    }
    public setType(type:string)
    {
        this.type=type;
    }
    public setDescription(description:string)
    {
        this.description=description;
    }
}