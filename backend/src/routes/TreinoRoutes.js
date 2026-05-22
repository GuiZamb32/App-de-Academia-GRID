const router = require('express').Router()

const treinoController = require('../controllers/treinoController')

const authMiddleware = require('../middlewares/authMiddleware')

router.post(
  '/',
  authMiddleware,
  treinoController.criar
)

router.get(
  '/',
  authMiddleware,
  treinoController.listar
)

module.exports = router