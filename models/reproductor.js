const mongoose = require('mongoose');

const schema = mongoose.Schema;

let reproductorSchema = schema({
    fecha: String[
        {
            pos: Number,
            nombre: String,
            artista: String,
            tipo_audio: String,
            duracion: String,
            hora_rep: String
        }
    ]
});

module.exports = mongoose.model('Reproductor', reproductorSchema);