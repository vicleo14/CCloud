import * as mysql from 'mysql';
import { IConnector } from "./IConnector";
import { createConnection } from 'net';

export class MDBConnector implements IConnector
{
    private readonly HOST="localhost";
    private readonly DATABASE="db_Ccloud";
    private readonly PORT="3306";
    private readonly USER="root";
    private readonly PASSWORD="root";
    //private mysql=require('mysql');
    private connection;
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