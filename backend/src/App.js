const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const treinoRoutes = require('./routes/treinoRoutes')
const exercicioRoutes = require('./routes/exercicioRoutes')
const usuarioRoutes = require('./routes/usuarioRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/treinos', treinoRoutes)
app.use('/exercicios', exercicioRoutes)
app.use('/usuario', usuarioRoutes)


module.exports = app