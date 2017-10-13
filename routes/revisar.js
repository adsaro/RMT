var express = require('express');
var router = express.Router();

var Usuario = require('../models/usuario');
var Tarea = require('../models/tarea');
var Materia = require('../models/materia');

router.get('/', function(req, res){
  if(req.user){
    (function buscarUsuario(){
      Usuario.findById(req.user.id, function(err, user){
        if(err){
          buscarUsuario();
        }else if(!user){
          res.render('redirect', {direccion: '/registrarse', mensaje: 'Tu usuario no está registrado. Por favor registrate para poder acceder'});
        }else{
          (function buscarTareas(){
            Tarea.find({usuario: req.user.id}).
            sort({fecha_creacion: -1}).
            exec(function(err, docs){
              if(err){
                buscarTareas();
              }else{
                res.render('revisar', {usuario: user, title: 'Tus tareas publicadas', tareas: docs});
              }
            });
          })();
        }
      });
    })();
  }else{
    res.render('redirect', {direccion: '/acceder', mensaje: 'Aún no has accedido como usuario. Por favor accede con tu usuario y contraseña'});
  }
});

module.exports = router;