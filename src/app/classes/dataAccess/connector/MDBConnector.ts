import * as mysql from 'mysql';
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
    connect():void
    {
       
        this.connection=mysql.createConnection(
            {
                host: this.HOST,
                user: this.USER,
                password: this.PASSWORD,
                database: this.DATABASE
            }
        );
        this.connection.connect(function(error){
            if(error){
               throw error;
            }else{
               console.log('Conexion correcta.');
            }
         });
    }
    close():void
    {
        this.connection.end();
        console.log('Conexion cerrada.');
    }
    getConnection():any{
        return this.connection;
    }

}