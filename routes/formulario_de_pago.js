/*dentro de este archivo necesitamos revisar la informacion del cliente para verificar su
estado, revisar la informacion de la propuesta y presentar toda la informacion en la pagina
pug*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res){
  res.render('formulario_de_pago', {title: "Pagar"});
  //desde aqui debemos bloquear las propuestas para la tarea e iniciar el deamon para desbloquear
  //despues de un cierto tiempo (10 minutos) y tambien bloquar al hacedor seleccionado por los mismos
  //10 minutos
});

module.exports = router;