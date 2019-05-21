const mysql=require("mysql");

const {promisify}=require('util');
const HOST="localhost";
const DATABASE="db_Ccloud";
const PORT="3306";
const USER="root";
const PASSWORD="root";
const pool=mysql.createPool(
    {
        host: HOST, 
        user:USER, 
        password:PASSWORD,
        connectionLimit: 5,
        database:DATABASE}
        );
pool.getConnection(
   (err,connection) =>
   {
       if(err)
       {
            if(err.code==="PROTOCOL_CONNECTION_LOST")
            {
                console.error("DB CONNECTION CLOSED");
            }
            console.log(err);
       }
       if(connection) connection.release();
            console.log("DB CONNECTED");
            return;
       
   }
);
pool.query = promisify(pool.query);

module.exports=pool;