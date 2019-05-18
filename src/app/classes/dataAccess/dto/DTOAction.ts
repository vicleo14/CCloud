export class DTOAction
{
    //private user:string;
    private action:number;
    private date:Date;
    private description:string;
    constructor()
    {
       
    }
    /* SETTERS */
    /*public setUser(user:string)
    {
        this.user=user;
    }*/
    public setAction(action:number)
    {
        this.action=action;
    }
    public setDate(date:Date)
    {
        this.date=date;
    }
    public setDescription(description:string)
    {
        this.description=description;
    }
    /* GETTERS */
    /*public getUser()
    {
        return this.user;
    }*/
    public getAction()
    {
        return this.action;
    }
    public getDate():Date
    {
        return this.date;
    }
    public getDescription():string
    {
       return this.description;
    }
}