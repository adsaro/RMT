const mongoose = require('mongoose');

var propuestaSchema = new mongoose.Schema({
    hacedor: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
    tarea: {type: mongoose.Schema.Types.ObjectId, ref: "Tarea"},
    timer: Number,
    precio: Number,
    tiempo_entrega: Number,
    activa: {type: Boolean, default: true}
});

module.exports = mongoose.model('Propuesta', propuestaSchema);