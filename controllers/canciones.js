'use strict';
const path = require('path');
const fs = require('fs');
const Cancion = require('../models/canciones');

let canciones = {
    agregar: (req, res) => {
        let datos = req.body;
        let cancion = req.files.audio;
        let ruta = `../canciones/${datos.autor}/`;
        
        // Vemos si no existe la carpeta del artista donde guardaremos la cancion
        if(!fs.existsSync(path.resolve(ruta))) {
          fs.mkdirSync(path.resolve(ruta), (err)=>{
            console.log(err);
          });
        }
        // Movemos el audio en la carpeta del autor correspondiente
        cancion.mv(path.resolve(`${ruta}${datos.nombre}`), err =>{
          if(err) {
            return res.status(500).send({ message: err});
          }

          return res.status(200).send({ message: 'Archivo Guardado' });
        });

        let audio = new Cancion();

        audio.nombre = datos.nombre;
        audio.autor = datos.autor;
        audio.genero = datos.genero;
        audio.duracion = datos.duracion;

        audio.save((err, musica)=>{
          if(err || !musica) {
            return res.status(404).send({
                status: 'error',
                message: "El audio no se ha guardado !!"
            });
        }else {
            //Devolver una respuesta
            return res.status(200).send({
                status: 'success'
            });
        }
        })
    },

    ver: (req, res) => {

    },
    modificar: (req, res) => {

    },
    eliminar: (req, res) => {

    }
}

module.exports = canciones;
