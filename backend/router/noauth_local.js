'use strict';

const authController = require('../router/auth');
const productController = require('../controller/product');
const express = require('express');
const router = express.Router();
const cors = require('cors'); //서버 통신 보안상 추가하지 않을경우 오류 발생할 수 있음.

/// ------------  google oauth const start ---------------------///
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
// router.use(cors()); //교차통신 적용

// Configure passport with Google OAuth 2.0 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: 'googleOauth_Config.clientID',
      clientSecret: 'googleOauth_Config.clientSecret',
      callbackURL: 'http://localhost:8000/api/auth/google/callback',
    },
    function (token, tokenSecret, profile, done) {
      console.log(
        'PROFILE: ' +
          JSON.stringify(profile) +
          'TOKEN: ' +
          JSON.stringify(token) +
          'TOKENSECRET: ' +
          JSON.stringify(tokenSecret),
      );
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
  passport.authenticate('google', {failureRedirect: 'http://localhost:9000'}),
  (req, res) => {
    const user = req.user;
    res.cookie('user', user).redirect('http://localhost:9000');
    // req.session.cookie.user = user;
    // res.json(user).redirect('http://localhost:9000');
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
