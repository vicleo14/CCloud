export interface IConnector{
    connect():void;
    close():void;
    getConnection():any

}