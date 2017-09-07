var express = require('express');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var router = express.Router();

var Usuario = require('../models/usuario');

/* GET home page. */
router.get('/', function(req, res){
  res.render('login');
});

router.post('/', passport.authenticate('local', {failureRedirect: '/accede'}), function(req, res, next){
  res.redirect('/');
});

module.exports = router;