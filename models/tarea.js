const mongoose = require('mongoose');

var tareaSchema = new mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
    hacedor: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
    materia: {type: mongoose.Schema.Types.ObjectId, ref: "Materia"},
    archivo: String,
    solucion: String,
    descripcion: String,
    propuestas: [],
    fecha_creacion: {type: Date, default: Date.now()},
    fecha_entrega: {type: Date, required: false},
    fecha_limite: {type: Date, required: false},
    calificacion: Number,
    precio: Number
});

module.exports = mongoose.model('Tarea', tareaSchema);