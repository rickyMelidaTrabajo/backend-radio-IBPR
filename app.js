const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

let rutasCanciones  = require('./routes/canciones');
let rutasReproductor = require('./routes/reproductor');

//Agregar prefijos a rutas / cargar rutas
app.use('/cancion', rutasCanciones);
app.use('/reproductor', rutasReproductor);

module.exports = app;
