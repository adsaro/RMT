var express = require('express');
var router = express.Router();

var options = {
  title: "Página principal del hacedor",
  tareas: [
    {
      _id: 1,
      descripcion: "Segunda tarea publicada :)",
      usuario: "void",
      hacedor: "void",
      materia: {nombre: "física"},
      archivo: "void",
      solucion: "void",
      propuestas: [{hacedor: "maker1", precio: 500, id: "1", tiempo_entrega: 4}, {hacedor: "maker2", precio: 600, id: "2", tiempo_entrega: 4}],
      fecha_creacion: "10-10-17",
      fecha_entrega: null,
      precio: null,
      calificacion: null
    },
    {
      _id: 2,
      descripcion: "Primer tarea publicada :)",
      usuario: "void",
      hacedor: "void",
      materia: {nombre: "matematicas"},
      archivo: "void2",
      solucion: "void2",
      propuestas: [{hacedor: "maker3", precio: 700, id: "3", tiempo_entrega: 4}, {hacedor: "maker4", precio: 400, id: "4", tiempo_entrega: 4}],
      fecha_creacion: "11-10-17",
      fecha_entrega: null,
      precio: null,
      calificacion: null
    }
  ]
}
/* GET home page. */
router.get('/', function(req, res){
  res.render('hacedor/index', options);
});

module.exports = router;