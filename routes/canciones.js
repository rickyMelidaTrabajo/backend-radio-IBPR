let express = require('express');
let canciones = require('../controllers/canciones');

let router = express.Router();


//rutas
router.post('/add', canciones.agregar);
router.get('/canciones/:nombre?', canciones.ver);
router.put('/canciones/id', canciones.modificar);
router.delete('/canciones/id', canciones.eliminar);

module.exports = router;
