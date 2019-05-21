export class DTOFileData
{
    private filename:string;
    private data:Buffer;

    constructor(){}

    /* SETTERS */
    public setFileName(filename:string)
    {
        return this.filename;
    }
    public setData(data:Buffer)
    {
        return this.data;
    }
     /* GETTERS */
     public getFileName()
     {
         return this.filename;
     }
     public getData()
     {
         return this.data;
     }

}