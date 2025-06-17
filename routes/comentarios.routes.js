const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentarios.controller');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, comentariosController.agregarComentario);
router.get('/:imagen_id', auth, comentariosController.obtenerComentariosPorImagen);

module.exports = router;