'use strict';

const authController = require('../router/auth');
const productController = require('../controller/product');
const express = require('express');
const router = express.Router();
// const dbConfig = require('../configs/db');
// const mysql = require('mysql');

// const db = mysql.createConnection({
//   host: dbConfig.host,
//   user: dbConfig.username,
//   password: dbConfig.password,
//   port: dbConfig.port,
//   database: dbConfig.database,
//   allowPublicKeyRetrieval: true,
//   ssl: false,
// });

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
      callbackURL: 'https://cfomarket.store/api/auth/google/callback',
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
      // }
      authController.google_login(
        profile,
        tokenSecret,
        token,
        function (err, user) {
          done(err, user);
        },
      );
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
  passport.authenticate('google', {
    failureRedirect: '/UserInfo',
  }),
  function (req, res) {
    // // Successful authentication, redirect home.
    // console.log('cookie:');
    // console.log(req.headers.cookie);
    const user = req.user;
    // console.log(user);
    if (user) {
      res.cookie('user', user).redirect('/');
    } else {
      res.redirect('/');
    }
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
