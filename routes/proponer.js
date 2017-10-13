var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario');
var Tarea = require('../models/tarea');
var Propuesta = require('../models/propuesta');

router.get('/', function(req, res){
  res.redirect('/');
});

router.get('/:id', function(req, res, next){
  if(req.user){
    (function buscarUsuario(){
      Usuario.findById(req.user.id, function(err, user){
        if(err){
          buscarUsuario();
        }else if(!user){
          res.render('redirect', {direccion: '/registrarse', mensaje: 'Tu usuario no está registrado. Por favor registrate para poder acceder'});
        }else if(user.tipo != "hacedor"){
          res.render('redirect', {direccion: '/como_funciona#hacedor', mensaje: 'Tu usuario no es un hacedor de tareas, antes debes convertirte en uno'})
        }else{
          (function buscarTarea(){
            Tarea.findById(req.params.id, function(err, tarea){
              if(err){
                buscarTarea();
              }else if(!tarea){
                res.render('redirect', {direccion: '/', mensaje: 'La tarea solicitada no se encuentra en el sistema'})
              }else{
                res.render('proponer', {title: 'Proponer precio por solución', usuario: user});
              }
            })
          })();
        }
      });
    })();
  }else{
    res.render('redirect', {direccion: '/acceder', mensaje: 'Aún no has accedido como usuario. Por favor accede con tu usuario y contraseña'});
  }
});

router.post('/:id', function(req, res, next){
  if(req.user){
    (function buscarUsuario(){
      Usuario.findById(req.user.id, function(err, user){
        if(err){
          buscarUsuario();
        }else if(!user){
          res.render('redirect', {direccion: '/registrarse', mensaje: 'Tu usuario no está registrado. Por favor registrate para poder acceder'});
        }else if(user.tipo != "hacedor"){
          res.render('redirect', {direccion: '/como_funciona#hacedor', mensaje: 'Tu usuario no es un hacedor de tareas, antes debes convertirte en uno'})
        }else{
          (function buscarTarea(){
            Tarea.findById(req.params.id, function(err, tarea){
              if(err){
                buscarTarea();
              }else if(!tarea){
                res.render('redirect', {direccion: '/', mensaje: 'La tarea solicitada no se encuentra en el sistema'})
              }else{
                var propuesta = new Propuesta({
                  precio: req.body.precio, 
                  tiempo_entrega: req.body.horas, 
                  hacedor: user._id,
                  rating: user.rating,
                  calificaciones: user.calificaciones
                });
                (function guardarPropuesta(){
                  propuesta.save(function(err, prop){
                    if(err){
                      guardarPropuesta();
                    }else{
                      tarea.propuestas.push(propuesta);
                      (function guardarTarea(){
                        tarea.save(function(err){
                          if(err){
                            guardarTarea();
                          }else{
                            res.render('redirect', {direccion: '/', mensaje: 'Tu propuesta fue guardada correctamente.'})
                          }
                        })
                      })();
                    }
                  })
                })();
              }
            })
          })();
        }
      });
    })();
  }else{
    res.render('redirect', {direccion: '/acceder', mensaje: 'Aún no has accedido como usuario. Por favor accede con tu usuario y contraseña'});
  }
});

module.exports = router;