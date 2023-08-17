'use strict';

const authController = require('../router/auth');
const productController = require('../controller/product');
const express = require('express');
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/productList', productController.getProductList);

module.exports = router;
