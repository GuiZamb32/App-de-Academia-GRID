// Server.js

require('dotenv').config()

const app = require('./App') // Importando o app que exportamos lá em cima

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})