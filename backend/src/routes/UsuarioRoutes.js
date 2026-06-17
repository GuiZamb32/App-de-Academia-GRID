// UsuarioRoutes.js

const router = require('express').Router()

const authMiddleware =
  require('../middlewares/AuthMiddleware')

const usuarioController =
  require('../controllers/usuarioController')

const usuarioController = 
require('../controllers/UsuarioController')


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


// Sua novas rota prototipada para o painel de dados
router.get(
  '/estatisticas',
  authMiddleware,
  usuarioController.buscarEstatisticas
)

module.exports = router

module.exports = router