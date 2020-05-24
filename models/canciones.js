'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema;

let cancioneShema = schema({
    nombre: String,
    autor: String,
    genero: String,
    duracion: String
});

module.exports = cancioneShema;