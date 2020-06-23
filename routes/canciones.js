let express = require('express');
let canciones = require('../controllers/canciones');

let router = express();


//rutas
router.post('/add', canciones.agregar);
router.get('/canciones/:nombre?', canciones.ver);
router.put('/modificar/:id', canciones.modificar);
router.delete('/eliminar/:id', canciones.eliminar);

module.exports = router;
