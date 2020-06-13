
const path = require('path');
const fs = require('fs');
const Cancion = require('../models/canciones');
const audioLoader = require('audio-loader');


let canciones = {
<<<<<<< HEAD
  agregar: (req, res) => {
    let datos = req.body;
    let cancion = req.files.audio;
    let ruta = `../canciones/${datos.autor}/`;
    var song = `${datos.nombre}.mp3`;
    let duracion = 0;


    // Vemos si no existe la carpeta del artista donde guardaremos la cancion
    //Para crear una carpeta dentro de otra en window hay que usar {recursive: true}
    if (!fs.existsSync(path.resolve(ruta))) {
      fs.mkdirSync(path.resolve(ruta), { recursive: true }, (err) => {
        console.log(err);
      });
    }

    //Verificamos si existe la cancion
    if (!fs.existsSync(`${ruta}${song}`)) {
      // Movemos el audio en la carpeta del autor correspondientes
      cancion.mv(path.resolve(`${ruta}${datos.nombre}.mp3`), err => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        return res.status(200).send({ message: 'Archivo Guardado' });
      });
    } else {
      console.log('La cancion ya existe');
      return res.status(200).send({ message: 'El archivo ya existe' });
    }

    let audio = new Cancion();

    audioLoader(`${ruta}${song}`).then((song) => {
      duracion = song.duration;
      console.log(`El audio dura ${duracion} segundos`);


      audio.nombre = datos.nombre;
      audio.autor = datos.autor;
      audio.genero = datos.genero;
      audio.duracion = duracion;

      audio.save((err, musica) => {
        if (err || !musica) {
          return res.status(404).send({
            status: 'error',
            message: "El audio no se ha guardado !!"
          });
        } else {
          //Devolver una respuesta
          return res.status(200).send({
            status: 'success'
          });
        }
      });
=======
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
>>>>>>> 3a8e2530834ddddaad40ada5d00640bc2e4f8935


    })

    console.log(`El audio dura ${duracion} segundos x2`);


  },

  ver: (req, res) => {

  },
  modificar: (req, res) => {

  },
  eliminar: (req, res) => {

  }
}

module.exports = canciones;
