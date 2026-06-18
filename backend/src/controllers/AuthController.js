//AuthController.js

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = require('../db/pool')

exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body

    const existe = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    )

    if (existe.rows.length > 0) {
      return res.status(400).json({
        erro: 'Email já cadastrado',
      })
    }

   const senhaHash = await bcrypt.hash(senha, 10)

const avatares = [
  '/icons/avatar_01.png',
  '/icons/avatar_02.png',
  '/icons/avatar_03.png',
  '/icons/avatar_04.png'
]

const avatarAleatorio =
  avatares[Math.floor(Math.random() * avatares.length)]

const novoUsuario = await pool.query(
  `
  INSERT INTO usuarios (
    nome,
    email,
    senha,
    foto_perfil
  )
  VALUES ($1, $2, $3, $4)
  RETURNING
    id,
    nome,
    email,
    foto_perfil AS foto
  `,
  [
    nome,
    email,
    senhaHash,
    avatarAleatorio
  ]
)
    res.status(201).json(novoUsuario.rows[0])

  } catch (err) {
    console.log(err)

    res.status(500).json({
      erro: 'Erro interno',
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body

    const usuario = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    )

    if (usuario.rows.length === 0) {
      return res.status(400).json({
        erro: 'Usuário não encontrado',
      })
    }

    const user = usuario.rows[0]

    const senhaValida = await bcrypt.compare(
      senha,
      user.senha
    )

    if (!senhaValida) {
      return res.status(400).json({
        erro: 'Senha inválida',
      })
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    )

   res.json({
  usuario: {
    id: user.id,
    nome: user.nome,
    email: user.email,
    foto: user.foto_perfil
  },
  token
})

  } catch (err) {
    console.log(err)

    res.status(500).json({
      erro: 'Erro interno',
    })
  }
}