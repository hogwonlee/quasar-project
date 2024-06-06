'use strict';

const env = process.env;
module.exports = {
  username: env.DB_USERNAME || 'hogwon',
  password: env.DB_PASSWORD || '1234',
  port: env.DB_PORT || 3306,
  database: env.DB_NAME || 'mystore',
  host: env.DB_HOST || 'localhost',
  dialect: 'mysql',
  clientID: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
};
