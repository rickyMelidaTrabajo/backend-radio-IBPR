let express = require('express');
const multipart  = require('connect-multiparty');
let canciones = require('../controllers/canciones');

let router = express();

let multipartRuta = multipart({ uploadDir: '../canciones'});


//rutas
router.post('/folder', canciones.compruebaRuta);
router.post('/add', multipartRuta, canciones.agregar);
router.get('/canciones/:nombre?', canciones.ver);
router.put('/modificar/:id', canciones.modificar);
router.delete('/eliminar/:id', canciones.eliminar);

module.exports = router;
