
const path = require('path');
const fs = require('fs');
const Cancion = require('../models/canciones');
const audioLoader = require('audio-loader');
const validator = require('validator');


let canciones = {
  agregar: (req, res) => {
    //Datos que recibimos de la peticion http
    let datos = req.body;
    
    let cancion;
    var validaCancion = false;

    if(req.files) {
      cancion = req.files.audio;
      validaCancion = true;
    }

    //Ruta absoluta de las canciones
    let ruta = `../canciones/${datos.autor}/`;

    var song = `${datos.nombre}.mp3`;
    let duracion = 0;

    var validaNombre = !validator.isEmpty(datos.nombre);
    var validaAutor = !validator.isEmpty(datos.autor);
    var validaTipo = !validator.isEmpty(datos.tipo);

    if(cancion) {
      var validaCancion = true;
    }

<<<<<<< HEAD
    //var validaCancion = !validator.isEmpty(datos.audio);
    console.log(validaCancion);
=======
    let audio = new Cancion();

    //Una vez que carga el audio sacamos su duracion, y guardamos los datos
    audioLoader(`${ruta}${song}`).then((song) => {
      duracion = Math.round(song.duration);
      console.log(`El audio dura ${duracion} segundos`);

>>>>>>> f5fd22d41f82a3662e86a5b3ec701442483f1c03

    if (validaNombre && validaAutor && validaTipo && validaCancion) {

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
        audio.tipo = datos.tipo;
        audio.duracion = Math.round(duracion);

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
    } else {
      res.status(500).send({
        status: 'error',
        mensaje: 'Faltan algunos datos'
      });
    }

  },

  ver: (req, res) => {

    let nombre = req.params.nombre;

    let query;
    
    //Creamos una expresion regular para la busqueda, la cual obvia las mayusculas y minusculas
    let busqueda = new RegExp(nombre, "i");

    if (nombre || nombre != undefined) {
      query = Cancion.find({ 
        $or: [
          {"autor" : busqueda },
          {"nombre": busqueda}
        ]
      });
    } else {
      query = Cancion.find();
    }

    console.log(`El nombre es ${nombre}`);

    query.sort('_id').exec((err, data) => {

      if (err) {
        res.status(500).send({
          status: 'error',
          message: 'Hay error al extraer los datos'
        });
      }

      if (!data) {
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
    var id = req.params.id;
    var datos = req.body;
    
    try {
      var validarNombre = !validator.isEmpty(datos.nombre);
      var validarAutor = !validator.isEmpty(datos.autor);
      var validarTipo = !validator.isEmpty(datos.tipo);

    } catch (error) {

      return res.status(200).send({
        status: 'error', 
        mensaje: 'Faltan datos para enviar!!'
      });
    }

    if(validarNombre && validarAutor && validarTipo) {
      Cancion.findOneAndUpdate({_id: id}, datos, {new: true}, (err, cancionModificado)=>{
        if(err) {
          return res.status(500).send({
            status: 'error',
            mensaje:'Error al actualizar la cancion'
          });
        }

        if(!cancionModificado) {
          return res.status(404).send({
            status: 'Error',
            mensaje: 'La cancion no existe!'
          });
        }

        //Modificamos las carpetas correspondientes a la cancion modificada
        


        return res.status(200).send({
          status: 'success',
          cancion: cancionModificado
        });

      })
    }else {
      return res.status(200).send({
        status: 'Error',
        mensaje: 'La validacion no es correcta'
      });
    }
    
  },

  eliminar: (req, res) => {
    var id = req.params.id;

    Cancion.findOneAndDelete({_id: id}, (err, audioEliminado)=>{
      if(err) {
        return res.status(500).send({
          status: 'Error',
          mensaje: 'Error al borrar!'
        });
      }

      if(!audioEliminado) {
        return res.status(404).send({
          status: 'Error',
          mensaje: 'No se borro el audio, puede que no exista'
        });
      }

      return res.status(200).send({
        status: 'success',
        audio: audioEliminado
      })
    })
  }
}

module.exports = canciones;
