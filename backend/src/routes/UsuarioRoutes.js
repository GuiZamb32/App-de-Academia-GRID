const router = require('express').Router()

const authMiddleware =
  require('../middlewares/AuthMiddleware')

const usuarioController =
  require('../controllers/usuarioController')

router.get(
  '/perfil',
  authMiddleware,
  usuarioController.buscarPerfil
)

router.put(
  '/perfil',
  authMiddleware,
  usuarioController.atualizarPerfil
)

module.exports = router