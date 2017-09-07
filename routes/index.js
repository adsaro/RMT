var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario');

/* GET home page. */
router.get('/', function(req, res, next) {
  var profesionales = {matematicas: 100, fisica: 40, quimica: 30, biologia: 20, historia: 15, espanol: 10, geografia: 10, otras: 40};
  if(req.user){
    (function encontrarUsuario(){
      Usuario.findById(req.user.id, function(err, usuario){
        if(err){
          encontrarUsuario();
        }else if(!usuario){
          res.render('index', { title: '¡Bienvenido!', profesionales: profesionales });
        }else{
          res.render('index', { title: '¡Bienvenido!', profesionales: profesionales, usuario: usuario });
        }
      });
    })();
  }else{
    res.render('index', { title: '¡Bienvenido!', profesionales: profesionales });
  }
});

router.get('/quienes_somos', function(req, res, next){
  res.render('quienes_somos', {title: 'Conocenos un poco más'});
});

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

router.use('/registro', require('./registro'));
router.use('/accede', require('./login'));

router.get('/se_hacedor', function(req, res, next){
  res.render('se_hacedor', {title: 'Forma parte de resuelvemitarea.com'});
});

module.exports = router;
