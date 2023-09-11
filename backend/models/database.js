const mysql = require('mysql');
const dbConfig = require('../configs/db');

// const db = mysql.createConnection({
const db = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
  port: dbConfig.port,
  database: dbConfig.database,
  allowPublicKeyRetrieval: true,
  ssl: false,
});

// db.connect();
db.getConnection(function (err, connection) {
  //如果有错误
  if (connection) {
    resolve(connection);
  } else {
    console.log('getConnection error :' + JSON.stringify(err));
    // connection.release();
    reject(err);
  }
});

module.exports = {
  db,
};
