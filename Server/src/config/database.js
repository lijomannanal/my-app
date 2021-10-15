const mysql = require('mysql');

const {
    DB_HOST = '127.0.0.1',
    DB_PORT = '3306',
    DB_SCHEMA = 'demodb',
    DB_USER = 'root',
    DB_PW = 'password',
    DB_CONNECTION_LIMIT = '5'
  } = process.env

const getConnection = () => {
  return new Promise(function(resolve,reject){
    try {
      const connection = mysql.createPool({
        host: DB_HOST, 
        port: Number(DB_PORT),
        user: DB_USER, 
        password: DB_PW,
        database: DB_SCHEMA,
        connectionLimit: DB_CONNECTION_LIMIT
      });
      resolve(connection);
    } catch (error) {
      reject(error)
    }
  });
}
export default getConnection;
