const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var usuarioSchema = mongoose.Schema({
  nombre: String,
  password: Object,
  email: String,
  creacion: {type: Date, default: Date.now},
  tipo: { type: String, default: "alumno", required: false },
  materias: [],
  rating: Number,
  calificaciones: Number
});

usuarioSchema.methods.comparar = function(pass){
  console.log("comparar");
  return bcrypt.compareSync(pass, this.password.hash);
};

usuarioSchema.statics.findByUsername = function(em, cb){
  console.log("Encontrar usuario");
  return this.findOne({nombre: em}, cb);
};

module.exports = mongoose.model('Usuario', usuarioSchema);