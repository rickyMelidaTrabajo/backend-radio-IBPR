
const path = require('path');
const fs = require('fs');
const Cancion = require('../models/canciones');


let canciones = {
    agregar: (req, res) => {
        let audio = req.files.audio;
        let nombreAudio = req.body.nombre;
        let autor = req.body.autor;
        let genero = req.body.genero;

        //ruta donde se van a guardat todas las canciones
        let rutaAbsoluta = path.resolve('../canciones');
        let rutaArtista = path.join(`${rutaAbsoluta}`, `${autor}`);

        if(!fs.existsSync(rutaArtista)){
          fs.mkdir(rutaArtista, ()=>{
            console.log('Se crea la carpeta ya que no existia');
          });
        }
        
        //console.log(rutaArtista);
        //Movemos la cancion que se sube a la carpeta de acuerdo al autor del audio
        audio.mv(`${rutaArtista}/${nombreAudio}.mp3`,err =>{
          if(err) {
            return res.status(500).send({menaje: err});
          }

          return res.status(200).send({menaje: 'Se guardo la cancion'})
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
