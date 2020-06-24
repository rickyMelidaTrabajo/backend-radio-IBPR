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
            var validarAutor = !validator.isEmpty(datos.autor);
            var validarTipoAudio = !validator.isEmpty(datos.tipo);
            var validarDuracion = !validator.isEmpty(datos.duracion);
            var validarHoraInicio = !validator.isEmpty(datos.horaInicio);
            var validarHoraFin = !validator.isEmpty(datos.horaFin);
        }catch(err) {
            return res.status(200).send({
                status: 'error',
                mensaje: 'Faltan datos'
            });
        }

        if(validarFecha && validarPos && validarNombre && validarAutor && validarTipoAudio && validarDuracion && validarHoraInicio && validarHoraFin) {
            var reproductor = new Reproductor();

            reproductor.fecha = datos.fecha;
            reproductor.pos = datos.pos;
            reproductor.nombre = datos.nombre;
            reproductor.autor = datos.autor;
            reproductor.tipo = datos.tipo;
            reproductor.duracion = Math.round(datos.duracion);
            reproductor.horaInicio = datos.horaInicio;
            reproductor.horaFin = datos.horaFin;

            reproductor.save((err, rep)=>{
                if(err || !rep) {
                    return res.status(404).send({
                        status: 'error',
                        mensaje: 'No se ha podido guardar los datos'
                    });
                }else {
                    return res.status(200).send({
                        status: 'success',
                        reproductor: rep
                    })
                }
            })

            /*return res.status(200).send({
                status: 'success',
                mensaje: 'Perfecto, todos los datos se validaron',
                datos: datos
            });*/
        }else {
            return res.status(200).send({
                status: 'error',
                mensaje: 'No se validaron los datos'
            });
        }

    },

    ver: (req, res)=>{

        let fecha = req.params.fecha;

        let query = Reproductor.find({fecha: fecha});

        query.sort('_id').exec((err, canciones)=> {

            if(err) {
                return  res.status(500).send({
                    status: 'error',
                    mensaje : 'Error al devolver los datos'
                });
            }

            if(canciones.length == 0) {
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
