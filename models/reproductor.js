const mongoose = require('mongoose');

const schema = mongoose.Schema;

let reproductorSchema = schema({
    pos: Number,
    nombre: String,
    artista: String,
    tipo_audio: String,
    duracion: String,
    hora_rep: String
});

module.exports = mongoose.model('Reproductor', reproductorSchema);