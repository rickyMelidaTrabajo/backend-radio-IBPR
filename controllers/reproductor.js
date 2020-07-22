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

        // console.log(datos);

        if (datos[0].nombre == '') {
            console.log('Si esta vacio');
            res.status(400).send({
                status: 'error',
                mensaje: 'Necesita cargar canciones en el reproductor'
            })
        } else {
            let reproduce = new Reproductor();
            reproduce.fecha = datos[0].fecha;

            for (var i = 0; i < datos.length; i++) {
                reproduce.audios.push({
                    pos: datos[i].pos,
                    nombre: datos[i].nombre,
                    autor: datos[i].autor,
                    tipo: datos[i].tipo,
                    duracion: datos[i].duracion,
                    horaInicio: datos[i].horaInicio,
                    horaFin: datos[i].horaFin
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
    modificar: (req, res) => {

    },
    eliminar: (req, res) => {

    }
}

module.exports = reproductor;
