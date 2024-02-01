const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

const pool = require('../database/dataBase.sql');
const usuarios = require('../models/usuario');


router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/login', { showNavbar: false });
  });
  
  router.post('/signin', isNotLoggedIn, async (req, res, next) => {
  
    passport.authenticate('local.signin', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
    })(req, res, next);
  });

  
  router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/register', { showNavbar: false });
  });
  
  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  }));
  
  router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
  });
  
  
  
  module.exports = router;