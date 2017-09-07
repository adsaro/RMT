const mongoose = require('mongoose');

var tareaSchema = new mongoose.Schema({
    usuario: mongoose.Schema.Types.ObjectId,
    hacedor: mongoose.Schema.Types.ObjectId,
    materia: mongoose.Schema.Types.ObjectId,
    directorio: String,
    propuestas: [],
    fecha_creacion: {type: Date, default: Date.now()},
    fecha_entrega: {type: Date, required: false},
    calificacion: Number,
    precio: Number
});

module.exports = mongoose.model('Tarea', tareaSchema);