// AuthRoutes.js

const router = require('express').Router()

const { cadastrar, login } = require('../controllers/AuthController')

router.post('/cadastro', cadastrar)
router.post('/login', login)

module.exports = router