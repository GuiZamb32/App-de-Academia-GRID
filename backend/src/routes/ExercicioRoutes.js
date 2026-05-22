const router = require('express').Router()

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

module.exports = router