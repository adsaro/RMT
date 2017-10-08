const mongoose = require('mongoose');

var hacedorMateriaSchema = new mongoose.Schema({
    hacedor: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
    materia: {type: mongoose.Schema.Types.ObjectId, ref: "Matera"},
    calificacion: Number
});

module.exports = mongoose.model('HacedorMateria', hacedorMateriaSchema);