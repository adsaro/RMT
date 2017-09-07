const mongoose = require('mongoose');

var hacedorMateriaSchema = new mongoose.Schema({
    hacedor: mongoose.Schema.Types.ObjectId,
    materia: mongoose.Schema.Types.ObjectId,
    calificacion: Number
});

module.exports = mongoose.model('HacedorMateria', hacedorMateriaSchema);