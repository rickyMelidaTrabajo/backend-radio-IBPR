const validator = require('validator');
const Reproductor = require('../models/reproductor');
const { replaceOne } = require('../models/reproductor');
let reproductor = {

    test: (req, res) => {
        let datos = req.body;

        return res.status(200).send({
            status: 'success',
            mensaje: 'Haciendo pruebas',
            datos: datos
        });
    },

    agregar: (req, res) => {
        let datos = req.body;

         console.log(datos);

        if (datos.audios.length <= 1) {
            //console.log('Si esta vacio');
            res.status(400).send({
                status: 'error',
                mensaje: 'Necesita cargar canciones en el reproductor'
            })
        } else {
            let reproduce = new Reproductor();
            reproduce.fecha = datos.fecha;

            for (var i = 0; i < datos.audios.length; i++) {
                reproduce.audios.push({
                    pos: datos.audios[i].pos,
                    nombre: datos.audios[i].nombre,
                    autor: datos.audios[i].autor,
                    tipo: datos.audios[i].tipo,
                    duracion: datos.audios[i].duracion,
                    horaInicio: datos.audios[i].horaInicio,
                    horaFin: datos.audios[i].horaFin
                });
            }

            reproduce.save((err, playlist) => {
                if (err || !playlist) {
                    res.status(500).send({
                        status: 'error',
                        mensaje: 'Error al guardar en la  BD'
                    })
                } else {
                    console.log(playlist);
                    res.status(200).send({
                        status: 'success',
                        mensaje: 'Se guarda lista de canciones a reproducir'
                    });
                }
            })

            console.log(`No, no esta vacio y la longitud es ${datos.length}`);
        }
        

    },

    ver: (req, res) => {

        let fecha = req.params.fecha;

        let query = Reproductor.find({ fecha: fecha });

        query.sort('_id').exec((err, canciones) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    mensaje: 'Error al devolver los datos'
                });
            }

            if (canciones.length == 0) {
                return res.status(404).send({
                    status: 'error',
                    mensaje: 'No hay canciones para reproducir'
                });
            }

            return res.status(200).send({
                status: 'success',
                canciones
            });

        })
    },

    getFechas: (req, res) => {

        let query = Reproductor.find({}, {"fecha": 1, "_id":0});
        

        query.sort('_id').exec((err, fechas) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    mensaje: 'Error al devolver los datos'
                });
            }

            if (fechas.length == 0) {
                return res.status(404).send({
                    status: 'error',
                    mensaje: 'No hay canciones para reproducir'
                });
            }

            return res.status(200).send({
                status: 'success',
                fechas
            });

        })
    },

    modificar: (req, res) => {

    },
    eliminar: (req, res) => {

    }
}

module.exports = reproductor;
