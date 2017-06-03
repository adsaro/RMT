const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var usuarioScheema = mongoose.Schema({
    nombre: String,
    password: Object,
    email: String,
    creacion: {type: Date, default: Date.now},
    tipo: { type: String, default: "alumno", required: false }
});

usuarioSchema.methods.comparar = function(pass){
    return bcrypt.compareSync(pass, this.password.hash);
};

usuarioSchema.statics.findByUsername = function(em, cb){
    return this.findOne({nombre: em}, cb);
};

module.exports = mongoose.model('Usuario', usuarioScheema);