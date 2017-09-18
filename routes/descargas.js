var express = require('express');
var router = express.Router();

var Usuario = require('../models/usuario');
var Tarea = require('../models/tarea');
var Materia = require('../models/materia');

router.get('/', function(req, res){
  res.redirect('/');
});

router.get('/tarea/:id', function(req, res, next){
  if(req.user){
    (function buscarUsuario(){
      Usuario.findById(req.user.id, function(err, user){
        if(err){
          buscarUsuario();
        }else if(!user){
          res.render('redirect', {direccion: '/registrarse', mensaje: "Tu usuario no está registrado. Por favor registrate para poder acceder"});
        }else{
          (function buscarTarea(){
            Tarea.findById(req.params.id, function(err, tarea){
              res.sendFile(tarea.archivo);
              res.end();
            });
          })();
        }
      });
    })();
  }else{
    res.render('redirect', {direccion: '/accede', mensaje: 'Aún no has accedido como usuario. Por favor accede con tu usuario y contraseña'});
  }
});

router.get('/solucion/:id', function(req, res, next){
  if(req.user){
    (function buscarUsuario(){
      Usuario.findById(req.user.id, function(err, user){
        if(err){
          buscarUsuario();
        }else if(!user){
          res.render('redirect', {direccion: '/registrarse', mensaje: "Tu usuario no está registrado. Por favor registrate para poder acceder"});
        }else{
          (function buscarTarea(){
            Tarea.findById(req.params.id, function(err, tarea){
              if(err){
                buscarTarea();
              }else{
                if(tarea.solucion){
                  if(tarea.hacedor == user._id){
                    res.sendFile(tarea.solucion);
                    res.end();
                  }else{
                    res.render('redirect', {direccion: '/', mensaje: 'No tienes acceso al archivo que intentas descargar.'})
                  }
                }else{
                  res.render('redirect', {direccion: '/', mensaje: 'La solución de tu tarea aún no ha sido subida.'});
                }
              }
            });
          })();
        }
      });
    })();
  }else{
    res.render('redirect', {direccion: '/accede', mensaje: 'Aún no has accedido como usuario. Por favor accede con tu usuario y contraseña'});
  }
});

module.exports = router;