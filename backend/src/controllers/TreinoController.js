// TreinoController.js

const pool = require('../db/pool')

exports.criar = async (req, res) => {
  try {
    const { nome } = req.body

    const usuarioId = req.usuarioId

    if (!nome) {
      return res.status(400).json({
        erro: 'Nome obrigatório',
      })
    }

    const result = await pool.query(
      `
      INSERT INTO treinos (usuario_id, nome)
      VALUES ($1, $2)
      RETURNING *
      `,
      [usuarioId, nome]
    )

    res.status(201).json(result.rows[0])

  } catch (err) {
    console.log(err)

    res.status(500).json({
      erro: 'Erro ao criar treino',
    })
  }
}

exports.listar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId

    const result = await pool.query(
      `
      SELECT *
      FROM treinos
      WHERE usuario_id = $1
      ORDER BY id DESC
      `,
      [usuarioId]
    )

    res.json(result.rows)

  } catch (err) {
    console.log(err)

    res.status(500).json({
      erro: 'Erro ao listar treinos',
    })
  }
}