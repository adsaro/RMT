var minutosEspera = 10;

var express = require('express');
var router = express.Router();

var Usuario = require('../models/usuario');
var Tarea = require('../models/tarea');
var Propuesta = require('../models/propuesta');

/* GET home page. */
router.get('/:id', function(req, res){
  if(req.user){
    (function buscarUsuario(){
      Usuario.findById(req.user.id, function(err, user){
        if(err){
          buscarUsuario();
        }else if(!user){
          res.render('redirect', {direccion: '/registrarse', mensaje: "Tu usuario no está registrado. Por favor registrate para poder acceder"});
        }else{
          //aquí el usuario ya fue verificado
          //ahora buscamos en el sistema la propuesta que intenta pagar
          (function buscarPropuesta(){
            Propuesta.findById(req.params.id)
            .populate('hacedor')
            .exec(function(err, prop){
              if(err){
                buscarPropuesta();
              }else if(!prop){
                res.render('redirect', {direccion: '/', mensaje: 'Ha habido un problema con la propuesta que intentabas aceptar. Por favor intenta de nuevo más tarde'});
              }else{
                //aqui la propuesta ya fue encontrada en el sistema
                //ahora buscamos las propuestas que pertenecen al mismo hacedor para bloquearlas
                Propuesta.update({hacedor: prop.hacedor._id}, {$set: {'items.$.activa': false}});
                prop.timer = setTimeout(function(){
                  Propuesta.update({hacedor: prop.hacedor._id}, {$set: {'items.$.activa': true}});
                }, 1000*60*minutosEspera);
                //finalmente renderizamos la pagina con todos los datos obtenidos
                res.render('formulario_de_pago', {
                  title: 'Completar pago',
                  calificaciones: {rating: prop.hacedor.rating, calificaciones: prop.hacedor.calificaciones},
                  precio_propuesto: prop.precio,
                  tiempo_de_entrega: prop.tiempo_entrega,
                  total_a_pagar: prop.precio + 10
                });
              }
            })
          })();
        }
      })
    })();
  }else{
    res.render('redirect', {direccion: '/accede', mensaje: 'Aún no has accedido como usuario. Por favor accede con tu usuario y contraseña'});
  }
});

module.exports = router;