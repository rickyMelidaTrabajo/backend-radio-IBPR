'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema;

let cancioneShema = schema({
    nombre: String,
    autor: String,
    tipo: String,
    duracion: String
});

module.exports = mongoose.model('Cancion', cancioneShema);