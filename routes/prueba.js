var express = require('express');
var router = express.Router();

var options = {
  title: "Formulario de pago",
  transaccion: {
    aprobada: false
  }
}

/* GET home page. */
router.get('/', function(req, res){
  res.render('respuesta_del_estado_de_pago', options);
});

module.exports = router;