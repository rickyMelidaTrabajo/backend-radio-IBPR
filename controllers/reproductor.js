const validator = require('validator');
const Reproductor = require('../models/reproductor');
let reproductor = {

    test: (req, res)=>{
        let datos = req.body;

        return res.status(200).send({
            status: 'success',
            mensaje: 'Haciendo pruebas',
            datos: datos
        });
    },
    agregar: (req, res)=>{
        let datos = req.body;

        //validamos los datos
        try {
            var validarFecha = !validator.isEmpty(datos.fecha);
            var validarPos = !validator.isEmpty(datos.pos);
            var validarNombre = !validator.isEmpty(datos.nombre);
            var validarArtista = !validator.isEmpty(datos.artista);
            var validarTipoAudio = !validator.isEmpty(datos.tipo);
            var validarDuracion = !validator.isEmpty(datos.duracion);
            var validarHoraRep = !validator.isEmpty(datos.hora_rep);

        }catch(err) {
            return res.status(200).send({
                status: 'error',
                mensaje: 'Faltan datos'
            });
        }

        if(validarFecha && validarPos && validarNombre && validarArtista && validarTipoAudio && validarDuracion && validarHoraRep) {
            return res.status(200).send({
                status: 'success',
                mensaje: 'Perfecto, todos los datos se validaron',
                datos: datos
            });
        }else {
            return res.status(200).send({
                status: 'error', 
                mensaje: 'No se validaron los datos'
            });
        }

    },
    ver: (req, res)=>{
        let query = Reproductor.find();
        let nombre = req.params.nombre;

        query.sort('_id').exec((err, canciones)=> {
            if(err) {
                return  res.status(500).send({
                    status: 'error',
                    mensaje : 'Error al devolver los datos'
                });
            }

            if(!canciones) {
                return res.status(404).send({
                    status: 'error',
                    mensaje : 'No hay canciones para reproducir'
                });
            }

            return res.status(200).send({
                status: 'success',
                canciones
            });

        })
    },
    modificar: (req, res)=> {

    },
    eliminar: (req, res)=>{

    }
}

module.exports = reproductor;