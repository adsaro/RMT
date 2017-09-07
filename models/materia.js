const mongoose = require('mongoose');

var materiaSchema = new mongoose.Schema({
    nombre: String
});

module.exports = mongoose.model('Materia', materiaSchema);