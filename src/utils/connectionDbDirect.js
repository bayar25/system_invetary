import mysql from 'mysql';

var connection = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'Bf12345678',
    database        : 'db_inventary'
  });
   
export default connection;