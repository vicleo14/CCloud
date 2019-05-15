import * as mariadb from 'mariadb';
import { IConnector } from './IConnector';

export class MConnector implements IConnector
{
    protected readonly HOST="localhost";
    protected readonly DATABASE="db_Ccloud";
    protected readonly PORT="3306";
    protected readonly USER="root";
    protected readonly PASSWORD="root";
    protected pool;
    constructor(){
        /*this.pool = mariadb.createPool({
            host: this.HOST, 
            user:this.USER, 
            password: this.PASSWORD,
            connectionLimit: 5,
            database: this.DATABASE
       });*/

    }
    async connect()
    {


    }

    close()
    {

    }
    getConnection()
    {

    }

}
