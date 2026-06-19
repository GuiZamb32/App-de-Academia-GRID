// ExercicioRoutes.js

const router = require('express').Router()

// 💡 Deixando a variável com "e" minúsculo para bater com o uso nas rotas abaixo
const exercicioController = require('../controllers/exercicioController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post(
  '/',
  authMiddleware,
  exercicioController.criar
)

router.get(
  '/:treinoId',
  authMiddleware,
  exercicioController.listar
)
router.delete(
  '/:id', 
  authMiddleware, 
  exercicioController.excluir)

module.exports = router