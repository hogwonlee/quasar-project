'use strict';

const {Sequelize} = require('sequelize');
const dbConfig = require('../configs/db');
const UserInfo = require('./userInfo');
const AddressInfo = require('./addressInfo');
// const ProductInfo = require('./productInfo');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    port: dbConfig.port,
  },
);

let User = UserInfo(sequelize);
let Address = AddressInfo(sequelize);
// let Product = ProductInfo(sequelize);

module.exports = {
  UserInfo: User,
  AddressInfo: Address,
  // ProductInfo: Product,
};
