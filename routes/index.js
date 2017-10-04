var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario');
var Tarea = require('../models/tarea');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user){
    (function encontrarUsuario(){
      Usuario.findById(req.user.id, function(err, usuario){
        if(err){
          encontrarUsuario();
        }else if(!usuario){
          res.redirect('/logout');
        }else{
          if(usuario.tipo == "alumno"){
            (function encontrarTareas(){
              Tarea.find({usuario: usuario._id}).
              sort('-fecha_creacion').
              exec(function(err, docs){
                if(err){
                  encontrarTareas();
                }else{
                  res.render('alumno/index', {title: '¡Bienvenido ' + usuario.nombre + '!', tareas: docs, usuario: usuario});
                }
              });
            })();
          }else if(usuario.tipo == "hacedor"){
            (function encontrarTareas(){
              Tarea.find({materia: {$in: usuario.materias}, fecha_entrega: {$exists: false}}).
              sort('-fecha_creacion').
              populate("materia").
              exec(function(err, docs){
                if(err){
                  encontrarTareas();
                }else{
                  console.log(docs)
                  res.render('hacedor/index', {title: '¡Bienvenido ' + usuario.nombre + '!', tareas: docs, usuario: usuario});
                }
              });
            })();
          }
        }
      });
    })();
  }else{
    var profesionales = {matematicas: 100, fisica: 40, quimica: 30, biologia: 20, historia: 15, espanol: 10, geografia: 10, otras: 40};
    res.render('index', { title: '¡Bienvenido!', profesionales: profesionales });
  }
});

router.get('/quienes_somos', function(req, res, next){
  if(req.user){
    (function encontrarUsuario(){
      Usuario.findById(req.user.id, function(err, usuario){
        if(err){
          encontrarUsuario();
        }else if(!usuario){
          res.redirect('/logout');
        }else{
          res.render('quienes_somos', {title: 'Conocenos un poco más', usuario: usuario});
        }
      });
    })();
  }else{
    res.render('quienes_somos', {title: 'Conocenos un poco más'});
  }
});

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

router.use('/registrarse', require('./registro'));
router.use('/acceder', require('./login'));

router.use('/como_funciona', function(req, res, next){
  if(req.user){
    (function encontrarUsuario(){
      Usuario.findById(req.user.id, function(err, usuario){
        if(err){
          encontrarUsuario();
        }else if(!usuario){
          res.redirect('/logout');
        }else{
          res.render('como_funciona', {title: 'Conoce cómo funciona resuelvemitarea.com', usuario: usuario});
        }
      });
    })();
  }else{
    res.render('como_funciona', {title: 'Conoce cómo funciona resuelvemitarea.com'});
  }
});
router.get('/se_hacedor', function(req, res, next){
  res.render('se_hacedor', {title: 'Forma parte de resuelvemitarea.com'});
});
router.use('/publicar_tarea', require('./publicar'));

router.use('/prueba', require('./prueba'));

router.use('/descargas', require('./descargas'));

router.use('/proponer', require('./proponer'));

module.exports = router;