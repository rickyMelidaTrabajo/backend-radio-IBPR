const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

let rutasCanciones  = require('./routes/canciones');
let rutasReproductor = require('./routes/reproductor');

//Agregar prefijos a rutas / cargar rutas
app.use('/cancion', rutasCanciones);
app.use('/reproductor', rutasReproductor);

module.exports = app;
