const mongoose = require('mongoose');

var tareaSchema = new mongoose.Schema({
    usuario: mongoose.Schema.Types.ObjectId,
    hacedor: mongoose.Schema.Types.ObjectId,
    materia: mongoose.Schema.Types.ObjectId,
    archivo: String,
    solucion: mongoose.Schema.Types.ObjectId,
    descripcion: String,
    propuestas: [],
    fecha_creacion: {type: Date, default: Date.now()},
    fecha_entrega: {type: Date, required: false},
    fecha_limite: {type: Date, required: false},
    calificacion: Number,
    precio: Number
});

module.exports = mongoose.model('Tarea', tareaSchema);