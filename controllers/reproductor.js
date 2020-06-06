const validator = require('validator');
const Reproductor = require('../models/reproductor');
let reproductor = {
    agregar: (req, res)=>{
        let datos = req.body;

        try {
            
        }catch(err) {

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