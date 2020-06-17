const mongoose = require('mongoose');

const schema = mongoose.Schema;

let reproductorSchema = schema({
    fecha: {
        pos: Number,
        nombre: String,
        artista: String,
        tipo: String,
        duracion: String,
        hora: String
    }

});

module.exports = mongoose.model('Reproductor', reproductorSchema);