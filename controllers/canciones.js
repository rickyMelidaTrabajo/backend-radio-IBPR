'use strict';
const path = require('path');

let canciones = {
    agregar: (req, res) => {
        let datos = req.body;
        let cancion = req.files.audio;

        //console.log(path.join(__dirname, 'files', cancion.name));
        cancion.mv(path.join(__dirname, 'files', cancion.name), err =>{
          if(err) {
            return res.status(500).send({ message: err});
          }

          return res.status(200).send({ message: 'Archivo Guardado' });
        });
    },

    ver: (req, res) => {

    },
    modificar: (req, res) => {

    },
    eliminar: (req, res) => {

    }
}

module.exports = canciones;
