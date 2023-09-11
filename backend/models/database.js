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

db.connect();

module.exports = {
  db,
};
