// App.js

const express = require('express')
const cors = require('cors')

// Importando as rotas (com a primeira letra maiúscula para bater com seus arquivos)
const authRoutes = require('./routes/AuthRoutes')
const userRoutes = require('./routes/UserRoutes')
const treinoRoutes = require('./routes/TreinoRoutes')
const exercicioRoutes = require('./routes/ExercicioRoutes')
const usuarioRoutes = require('./routes/UsuarioRoutes')

const app = express() 

app.use(cors())
app.use(express.json())

// Configurando os endpoints do sistema
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/treinos', treinoRoutes)
app.use('/exercicios', exercicioRoutes)
app.use('/usuario', usuarioRoutes)

module.exports = app