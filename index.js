'use strict';

let mongoose  = require('mongoose');
let app = require('./app');
let port = 3900;

mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/radio-ibpr', { useNewUrlParser: true })
    .then( ()=>{
        console.log('Conexion a BD establecida');

        app.listen(port, ()=>{
            console.log('Servidor corriendo en puerto ' + port);
        });
    });