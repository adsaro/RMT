/*renderizar la pagina del estado del pago y sugerir qué hacer en caso de fallo o de aprobación*/
var express = require('express');
var router = express.Router();
var md5 = require('md5');

var Usuario = require('../models/usuario');
var Propuesta = require('../models/propuesta');

/* GET home page. */
router.get('/:id', function(req, res){
  if(req.user){
    (function buscarUsuario(){
      Usuario.findById(req.user.id, function(err, user){
        if(err){
          buscarUsuario();
        }else if(!user){
          res.render('redirect', {direccion: '/acceder', mensaje: 'Aún no has accedido como usuario. Por favor accede con tu usuario y contraseña'});
        }else{
          //aqui el usuario ya fue verificado
          //ahora verificamos que las firmas coincidan, si coinciden enviaremos los datos a la pagina de confirmacion
          function rhe(x){return x*100%10 == 5 && Math.floor(x*10) % 2 == 0 ? Math.floor(x*10)/10 : Math.round(x*10)/10}
          if(req.query.signature.toUpperCase() == md5(ApiKey+"~"+req.query.merchantId+"~"+req.query.referenceCode+"~"+rhe(req.query.TX_VALUE)+"~"+req.query.currency+"~"+req.query.transactionState).toUpperCase()){
            (function buscarPropuesta(){
              Propuesta.findById(req.params.id, function(err, prop){
                if(err){
                  buscarPropuesta();
                }else if(!prop){
                  res.render('redirect', {direccion: '/', mensaje: 'La propuesta que intentabas pagar no se encuentra en el sistema. '
                   + 'Por favor ponte en contacto con nosotros para encontrar la solución a este problema.'});
                }else{
                  var estado, titulo;
                  switch(transactionState){
                    case 4: estado = "Aprobado";
                      titulo = "Pagor realizado exitosamente";
                    break;
                    case 6: estado = "Declinado";
                      titulo = "Pago declinado";
                    break;
                    case 104: estado = "Error";
                      titulo = "Error en el pago";
                    break;
                    case 5: estado = "Expirado";
                      titulo = "Pago expirado";
                    break;
                    case 7: estado = "Pendiente";
                      titulo = "Pago pendiente";
                    break;
                  }
                  var opciones = {
                    title: titulo,
                    estado: estado,
                    transactionId: req.query.transactionId,
                    reference_pol: req.query.reference_pol,
                    referenceCode: req.query.referenceCode,
                    pseBank: req.query.pseBank,
                    cus: req.query.cus,
                    valor: req.query.TX_VALUE,
                    moneda : req.query.currency,
                    descripcion: req.query.description,
                    entidad: req.query.lapPaymentMethod
                  }
                  res.render('respuesta_del_estado_de_pago', opciones);
                }
              });
            })();
          }else{
            res.render('redirect', {direccion: '/', mensaje: 'Error validando la firma digital'});
          }
        }
      })
    })();
  }else{
    res.render('redirect', {direccion: '/acceder', mensaje: 'Aún no has accedido como usuario. Por favor accede con tu usuario y contraseña'});
  }
});

router.post('/:id', function(req, res, next){
  //deshabilitar el daemon, decide si eliminar las demas propuestas del hacedor, actualizar la base
  //de datos, avisarle al hacedor en caso de ser necesario, iniciar el temporizador para la finalizacion
  //de la tarea, enviar aviso a estas chavas para que verifiquen que efectivamente el pago fue
  //realizado correctamente.
  if(req.user){
    (function buscarUsuario(){
      Usuario.findById(req.user.id, function(err, user){
        if(err){
          buscarUsuario();
        }else if(!user){
          res.render('redirect', {direccion: '/acceder', mensaje: 'Aún no has accedido como usuario. Por favor accede con tu usuario y contraseña'});
        }else{
          //aqui el usuario ya fue verificado
          //ahora verificamos que las firmas coincidan, si coinciden enviaremos los datos a la pagina de confirmacion
          function rhe(x){return x*100%10 == 5 && Math.floor(x*10) % 2 == 0 ? Math.floor(x*10)/10 : Math.round(x*10)/10}
          if(req.query.signature.toUpperCase() == md5(ApiKey+"~"+req.query.merchantId+"~"+req.query.referenceCode+"~"+rhe(req.query.TX_VALUE)+"~"+req.query.currency+"~"+req.query.transactionState).toUpperCase()){
            (function buscarPropuesta(){
              Propuesta.findById(req.params.id, function(err, prop){
                if(err){
                  buscarPropuesta();
                }else if(!prop){
                  res.render('redirect', {direccion: '/', mensaje: 'La propuesta que intentabas pagar no se encuentra en el sistema. '
                   + 'Por favor ponte en contacto con nosotros para encontrar la solución a este problema.'});
                }else{
                  var estado, titulo;
                  switch(transactionState){
                    case 4: estado = "Aprobado";
                      titulo = "Pagor realizado exitosamente";
                    break;
                    case 6: estado = "Declinado";
                      titulo = "Pago declinado";
                    break;
                    case 104: estado = "Error";
                      titulo = "Error en el pago";
                    break;
                    case 5: estado = "Expirado";
                      titulo = "Pago expirado";
                    break;
                    case 7: estado = "Pendiente";
                      titulo = "Pago pendiente";
                    break;
                  }
                  var opciones = {
                    title: titulo,
                    estado: estado,
                    transactionId: req.query.transactionId,
                    reference_pol: req.query.reference_pol,
                    referenceCode: req.query.referenceCode,
                    pseBank: req.query.pseBank,
                    cus: req.query.cus,
                    valor: req.query.TX_VALUE,
                    moneda : req.query.currency,
                    descripcion: req.query.description,
                    entidad: req.query.lapPaymentMethod
                  }
                  res.render('respuesta_del_estado_de_pago', opciones);
                }
              });
            })();
          }else{
            res.render('redirect', {direccion: '/', mensaje: 'Error validando la firma digital'});
          }
        }
      })
    })();
  }else{
    res.render('redirect', {direccion: '/acceder', mensaje: 'Aún no has accedido como usuario. Por favor accede con tu usuario y contraseña'});
  }
});

module.exports = router;