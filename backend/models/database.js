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

db.on('error', function (err) {
  console.log('on databse error event:', err);
});

// db.connect();
db.getConnection(function (err, connection) {
  if (err) {
    console.log('connection error:', err)
  }
});

module.exports = {
  db,
};
