'use strict';

const authController = require('../router/auth');
const productController = require('../controller/product');
const express = require('express');
const router = express.Router();

router.post('/api/login', authController.login);
router.post('/api/register', authController.register);
router.get('/api/productList', productController.getProductList);

module.exports = router;
