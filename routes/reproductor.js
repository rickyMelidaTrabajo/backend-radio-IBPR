let express = require('express');
let reproductor = require('../controllers/reproductor');

let router = express.Router();

//rutas
router.post('/test', reproductor.test);
router.post('/add', reproductor.agregar);
router.get('/ver/:fecha?', reproductor.ver);
router.get('/getfecha', reproductor.getFechas);
router.put('/modificar/id', reproductor.modificar);
router.delete('/eliminar/id', reproductor.eliminar);


module.exports = router;