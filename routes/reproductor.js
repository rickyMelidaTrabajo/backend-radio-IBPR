let express = require('express');
let reproductor = require('../controllers/reproductor');

let router = express.Router();

//rutas
router.post('/add', reproductor.agregar);
router.get('/canciones/:nombre?', reproductor.ver);
router.put('/canciones/id', reproductor.modificar);
router.delete('/canciones/id', reproductor.eliminar);


module.exports = router;