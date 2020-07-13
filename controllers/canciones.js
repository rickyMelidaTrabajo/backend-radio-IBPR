
const path = require('path');
const fs = require('fs');
const Cancion = require('../models/canciones');
const audioLoader = require('audio-loader');
const validator = require('validator');


let canciones = {

    ruta: {
    absoluta: '../canciones/'
  },

  compruebaRuta: (req, res) => {

    let rutaAbsoluta = canciones.ruta.absoluta;
    let nombreCarpeta = req.body.autor;

    var rutaRelativa = rutaAbsoluta + '/' + nombreCarpeta;

    if (!fs.existsSync(path.resolve(`${rutaRelativa}`))) {
      fs.mkdirSync(path.resolve(`${rutaRelativa}`), { recursive: false }, (err) => {
        if (err) {
          return res.status(500).send({
            status: 'error',
            mensaje: 'No se pudo crear la carpeta'
          });
        }
      });

      return res.status(200).send({
        status: 'success',
        mensaje: `Se crea la carpeta, ahora la ruta es ${rutaRelativa}`
      });

    } else {
      return res.status(200).send({
        status: 'success',
        mensaje: `La ruta ${rutaRelativa} ya existe`
      });
    }

  },

  agregar: (req, res) => {
    let datos = JSON.parse(req.body.datos);
    let archivo = req.files.audio;

    var validaNombre = !validator.isEmpty(datos.nombre);
    var validaAutor = !validator.isEmpty(datos.autor);
    var validaTipo = !validator.isEmpty(datos.tipo);

    let rutaCancion = `${canciones.ruta.absoluta}${datos.autor}/${datos.nombre}.mp3`;

    if (fs.existsSync(rutaCancion)) {
      fs.unlink(archivo.path, (err)=>{
        if(err) {
          res.status(500).send({
            status: 'error',
            mensaje: 'Error 500'
          });
        }
      });

      res.status(200).send({
        status: 'success',
        mensaje: 'El audio ya existe'
      });

    } else {

      //Validamos los datos del audio
      if (validaNombre && validaAutor && validaTipo) {

        //validamos si el audio es
        if (archivo.type == 'audio/mpeg') {
          fs.rename(archivo.path, rutaCancion, () => {

            let audio = new Cancion();

            audioLoader(rutaCancion).then((song) => {
              let duracion = song.duration;

              audio.nombre = datos.nombre;
              audio.autor = datos.autor;
              audio.tipo = datos.tipo;
              audio.duracion = Math.round(duracion);

              audio.save((err, musica) => {
                if (err || !musica) {
                  console.log('Erro al guardar a la BD');
                } else {
                  console.log('Se guardo el audio en la BD');
                }
              });


            });
            return res.status(200).send({
              status: 'success',
              mensaje: 'Cancion agregada'
            });
          });

        } else {
          return res.status(500).send({
            status: 'error',
            mensaje: 'Formato de archivo no valido'
          });
        }
      } else {
        return res.status(500).send({
          status: 'error',
          mensaje: 'Faltan completar algunos datos'
        });
      }

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
          { "autor": busqueda },
          { "nombre": busqueda }
        ]
      });
    } else {
      query = Cancion.find();
    }

    // console.log(`El nombre es ${nombre}`);

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

    if (validarNombre && validarAutor && validarTipo) {
      Cancion.findOneAndUpdate({ _id: id }, datos, { new: true }, (err, cancionModificado) => {
        if (err) {
          return res.status(500).send({
            status: 'error',
            mensaje: 'Error al actualizar la cancion'
          });
        }

        if (!cancionModificado) {
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
    } else {
      return res.status(200).send({
        status: 'Error',
        mensaje: 'La validacion no es correcta'
      });
    }

  },

  eliminar: (req, res) => {
    var id = req.params.id;

    Cancion.findOneAndDelete({ _id: id }, (err, audioEliminado) => {
      if (err) {
        return res.status(500).send({
          status: 'Error',
          mensaje: 'Error al borrar!'
        });
      }

      if (!audioEliminado) {
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
