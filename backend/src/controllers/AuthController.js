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

    const novoUsuario = await pool.query(
      `
      INSERT INTO usuarios (nome, email, senha)
      VALUES ($1, $2, $3)
      RETURNING id, nome, email
      `,
      [nome, email, senhaHash]
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
      },
      token,
    })

  } catch (err) {
    console.log(err)

    res.status(500).json({
      erro: 'Erro interno',
    })
  }
}