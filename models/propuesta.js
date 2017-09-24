const mongoose = require('mongoose');

var propuestaSchema = new mongoose.Schema({
    hacedor: mongoose.Schema.Types.ObjectId,
    tarea: mongoose.Schema.Types.ObjectId,
    precio: Number,
    tiempo_entrega: Number
});

module.exports = mongoose.model('Propuesta', propuestaSchema);