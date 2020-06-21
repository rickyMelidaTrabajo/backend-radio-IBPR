
const path = require('path');
const fs = require('fs');
const Cancion = require('../models/canciones');
const audioLoader = require('audio-loader');


let canciones = {
  agregar: (req, res) => {
    //Datos que recibimos de la peticion http
    let datos = req.body;
    //extraemos el audio mp3
    let cancion = req.files.audio;
    //Ruta absoluta de las canciones
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

    //Una vez que carga el audio sacamos su duracion, y guardamos los datos
    audioLoader(`${ruta}${song}`).then((song) => {
      duracion = Math.round(song.duration);
      console.log(`El audio dura ${duracion} segundos`);


      audio.nombre = datos.nombre;
      audio.autor = datos.autor;
      audio.tipo = datos.tipo;
      audio.duracion = duracion;

      audio.save((err, musica) => {
        if (err || !musica) {
         /* return res.status(404).send({
            status: 'error',
            message: "El audio no se ha guardado !!"
          });*/
          console.log('Erro al guardar a la BD');
        } else {
          //Devolver una respuesta
          /*return res.status(200).send({
            status: 'success',
          });*/
          console.log('Se guardo el audio en la BD');
        }
      });


    })

    console.log(`El audio dura ${duracion} segundos x2`);


  },

  ver: (req, res) => {

    let nombre = req.params.nombre;

    let query;

    if(nombre || nombre != undefined){
      query = Cancion.find({autor: nombre});
    }else {
      query = Cancion.find();
    }

    console.log(`El nombre es ${nombre}`);

    query.sort('_id').exec((err, data)=>{

      if(err) {
        res.status(500).send({
          status: 'error',
          message: 'Hay error al extraer los datos'
        });
      }

      if(!data) {
        res.status(404).send({
          status: 'error',
          mensaje: 'No hay datos en la base de datos'
        });
      }

      res.status(200).send({
        status: 'success',
        data
      });

    });
  },
  
  modificar: (req, res) => {

  },
  eliminar: (req, res) => {

  }
}

module.exports = canciones;
