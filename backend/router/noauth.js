'use strict';

const authController = require('../router/auth');
const productController = require('../controller/product');
const express = require('express');
const router = express.Router();

router.post('/api/login', authController.login);
router.post('/api/register', authController.register);
router.get('/api/productList', productController.getProductList);

// Google auth routes
router.get(
  '/auth/google',
  global.PASSPORT.authenticate('google', {scope: ['profile', 'email']}),
);

router.get(
  '/auth/google/callback',
  global.PASSPORT.authenticate('google', {failureRedirect: '/'}),
  (req, res) => {
    res.redirect('/');
  },
);

module.exports = router;
