// App.js

const express = require('express')
const cors = require('cors')

// Importando as rotas (com a primeira letra maiúscula para bater com seus arquivos)
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const treinoRoutes = require('./routes/treinoRoutes')
const exercicioRoutes = require('./routes/exercicioRoutes')
const usuarioRoutes = require('./routes/usuarioRoutes')

const app = express() 

app.use(cors())

// 💡 CORRIGIDO: Linhas atualizadas com limite de 10mb para suportar o Base64 das fotos de perfil
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Configurando os endpoints do sistema
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/treinos', treinoRoutes)
app.use('/exercicios', exercicioRoutes)
app.use('/usuario', usuarioRoutes)

module.exports = app