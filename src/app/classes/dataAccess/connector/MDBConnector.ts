import * as mysql from 'mysql';
import {promisify} from 'util';
import { IConnector } from "./IConnector";
import { createConnection } from 'net';

export class MDBConnector implements IConnector
{
    protected readonly HOST="localhost";
    protected readonly DATABASE="db_Ccloud";
    protected readonly PORT="3306";
    protected readonly USER="root";
    protected readonly PASSWORD="root";
    //private mysql=require('mysql');
    protected connection;
    constructor(){}
    async connect()
    {
       
        
            const database=
            {   host: this.HOST,
                user: this.USER,
                password: this.PASSWORD,
                database: this.DATABASE
            }
        //this.connection=await mysql.createConnection(database);
        this.connection=mysql.createPool(database);
        console.log("Uno");
        await this.connection.connect(async function(error){
            if(error){
               throw error;
            }else{
               console.log('Conexion correcta.');
            }
         });
         console.log("Dos");
    }
    async close()
    {
        await this.connection.end();
        console.log('Conexion cerrada.');
    }
    getConnection():any{
        return this.connection;
    }

}