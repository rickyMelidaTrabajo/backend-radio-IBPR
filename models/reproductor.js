const mongoose = require('mongoose');

const schema = mongoose.Schema;

let reproductorSchema = schema({
<<<<<<< HEAD
    fecha: {
        pos: Number,
        nombre: String,
        artista: String,
        tipo: String,
        duracion: String,
        hora: String
    }

=======
            fecha: Date,
            pos: Number,
            nombre: String,
            artista: String,
            tipo: String,
            duracion: String,
            hora: String
>>>>>>> 3a8e2530834ddddaad40ada5d00640bc2e4f8935
});

module.exports = mongoose.model('Reproductor', reproductorSchema);