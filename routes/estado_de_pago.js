/*renderizar la pagina del estado del pago y sugerir qué hacer en caso de fallo o de aprobación*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res){
  res.render('respuesta_del_estado_de_pago', {title: "Pagar"});
});

router.post('/', function(req, res, next){
  //deshabilitar el daemon, decide si eliminar las demas propuestas del hacedor, actualizar la base
  //de datos, avisarle al hacedor en caso de ser necesario, iniciar el temporizador para la finalizacion
  //de la tarea, enviar aviso a estas chavas para que verifiquen que efectivamente el pago fue
  //realizado correctamente.
})

module.exports = router;