var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var Usuario = require('../models/usuario');

router.get('/', function(req, res, next){
  res.render('registro', {title: 'Forma parte de resuelvemitarea.com'});
});

router.post('/', function(req, res, next){
  (function encontrarUsuario(){
    Usuario.find({nombre: req.body.nombre}, function(err, usuario){
      if(err){
        encontrarUsuario();
      }else if(usuario.length){
        console.log(usuario);
        res.redirect('/registro/existente');
      }else{
        var salt1 = bcrypt.genSaltSync();
        var hash1 = bcrypt.hashSync(req.body.password, salt1);
        var nuevo = new Usuario({
          nombre: req.body.nombre,
          password: {
            salt: salt1,
            hash: hash1
          }
        });
        (function guardarUsuario(){
          nuevo.save(function(err, dato){
            if(err){
              guardarUsuario();
            }else{
              console.log(dato);
              res.redirect('/acceder');
            }
          });
        })();
      }
    });
  })();
});

router.get('/existente', function(req, res, next){
  res.render('usuario_existente');
});

module.exports = router;