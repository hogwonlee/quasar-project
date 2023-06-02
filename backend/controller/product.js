'use strict';
const Product = require('../models/index').ProductInfo;

const getProductCategory = async () => {
  return await Product.findCategory();
};

module.exports = {
  getProductCategory,
};
