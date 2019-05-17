export class DTOAction
{
    //private user:string;
    private actions:number[];
    constructor()
    {
        this.actions=new Array();
    }
    public addAction(action:number)
    {
        this.actions.push(action);
    }
    /* SETTERS */
    /*public setUser(user:string)
    {
        this.user=user;
    }*/
    public setActions(actions:number[])
    {
        this.actions=actions;
    }
    /* GETTERS */
    /*public getUser()
    {
        return this.user;
    }*/
    public getActions()
    {
        return this.actions;
    }
}