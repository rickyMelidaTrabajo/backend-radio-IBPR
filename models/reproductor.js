const mongoose = require('mongoose');

const schema = mongoose.Schema;

let reproductorSchema = schema({
    fecha: Date,
    pos: Number,
    nombre: String,
    autor: String,
    tipo: String,
    duracion: Number,
    horaInicio: Number,
    horaFin: Number
});

module.exports = mongoose.model('Reproductor', reproductorSchema);