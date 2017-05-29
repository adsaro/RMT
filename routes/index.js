var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var profesionales = {matematicas: 100, fisica: 40, quimica: 30, biologia: 20, historia: 15, espanol: 10, geografia: 10, otras: 40}
  res.render('index', { title: '¡Bienvenido!', profesionales: profesionales });
});

router.get('/quienes_somos', function(req, res, next){
  res.render('quienes_somos', {title: 'Conocenos un poco más'})
});

module.exports = router;
