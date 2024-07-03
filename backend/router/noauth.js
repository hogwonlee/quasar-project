'use strict';

const authController = require('../router/auth');
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
router.post('/api/register', authController.register);
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
      callbackURL: 'https://cfomarket.store:3000/api/auth/google/callback',
    },
    (token, tokenSecret, profile, done) => {
      console.log(JSON.stringify(profile));
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
  '/auth/google',
  passport.authenticate('google', {scope: ['profile', 'email']}),
);

router.get(
  '/auth/google/callback',
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
