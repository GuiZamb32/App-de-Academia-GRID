// TreinoRoutes.js

const router = require('express').Router()

// 💡 Variável em minúsculo chamando o arquivo real que começa com Maiúscula
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

router.delete(
  '/:id', 
  authMiddleware, 
  treinoController.excluir
);

module.exports = router