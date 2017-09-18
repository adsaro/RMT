var express = require('express');
var router = express.Router();
var multer = require('multer');
var shortid = require('shortid')

var Usuario = require('../models/usuario');
var Tarea = require('../models/tarea');
var Materia = require('../models/materia');

/* GET home page. */
router.get('/', function(req, res){
  (function encontrarMaterias(){
    Materia.findAll(function(err, materias){
      if(err){
        encontrarMaterias();
      }else{
        res.render('publicar_tarea', {materias: materias, title: "Publica tu tarea para que sea visible"});
      }
    });
  })();
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/tareas/')
  },
  filename: function (req, file, cb) {
    var nombre = file.originalname.split('.');
    cb(null, shortid.generate() + '.' + nombre[nombre.length - 1])
  }
});

var upload = multer({storage: storage});
router.post('/', upload.single('archivo'), function(req, res, next){
  (function encontrarUsuario(){
    Usuario.findById(req.user.id, function(err, user){
      if(err){
        encontrarUsuario();
      }else if(!user){
        res.render('redirect', {direccion: '/accede', mensaje: 'Aún no has accedido como usuario. Por favor accede con tu usuario y contraseña'});
      }else{
        var arch = req.file.path;
        var materia = req.body.materia;
        var tarea = new Tarea({materia: materia, archivo: arch, usuario: user});
        function guardar(elemento){
          elemento.save(function(err){
            if(err){
              console.log(err);
              guardar(elemento);
            }else{
              res.render('tarea_enviada', {title: 'Tu tarea ha sido enviada'})
            }
          });
        }
        guardar(video);
      }
    });
  })();
});

module.exports = router;