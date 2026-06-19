// UsuarioRoutes.js

const router = require('express').Router()

const authMiddleware = require('../middlewares/authMiddleware')
const usuarioController = require('../controllers/usuarioController') 

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

router.get(
  '/estatisticas',
  authMiddleware,
  usuarioController.buscarEstatisticas
)

module.exports = router