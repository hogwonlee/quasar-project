'use strict';

const authController = require('../router/auth');
// const loginController = require('../controller/user');
const productController = require('../controller/product');
const express = require('express');
const router = express.Router();

/// ------------ google oauth const start ---------------------///
const passport = require('passport');
// global.PASSPORT = passport;

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleOauth_Config = require('../configs/db');

/// ------------ google oauth const end ---------------------///

router.post('/api/login', authController.login);
// router.post('/api/login', loginController.login);
router.post('/api/register', authController.register);
router.post('/api/deleteAccount', authController.deleteAccount);
router.post('/api/orderRegister', authController.orderRegister);
router.post('/api/no_id_address', authController.no_id_address);
router.get('/api/productList', productController.getProductList);

// Initialize passport
router.use(passport.initialize());
router.use(passport.session());

// Configure passport with Google OAuth 2.0 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: googleOauth_Config.clientID,
      clientSecret: googleOauth_Config.clientSecret,
      callbackURL: '/auth/google/callback',
    },
    (token, tokenSecret, profile, done) => {
      console.log(
        'PROFILE: ' +
          JSON.stringify(profile) +
          'TOKEN: ' +
          JSON.stringify(token) +
          'TOKENSECRET: ' +
          JSON.stringify(tokenSecret),
      );
      authController.google_login;
      return done(err, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Google auth routes
router.get(
  '/api/auth/google',
  passport.authenticate('google', {scope: ['profile', 'email']}),
);

router.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}),
  (req, res) => {
    res.redirect('/');
  },
);
// Route to get user info
router.get('/api/user', (req, res) => {
  res.send(req.user);
});

// Logout route
router.get('/api/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

/// ------------ google oauth get end---------------------///

module.exports = router;
