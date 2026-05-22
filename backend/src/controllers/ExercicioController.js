const pool = require('../db/pool')

exports.criar = async (req, res) => {
  try {
    const {
      treino_id,
      nome,
      grupo,
      series,
      reps,
      carga,
    } = req.body

    if (!treino_id || !nome) {
      return res.status(400).json({
        erro: 'Dados obrigatórios',
      })
    }

    const result = await pool.query(
      `
      INSERT INTO exercicios
      (
        treino_id,
        nome,
        grupo,
        series,
        reps,
        carga
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        treino_id,
        nome,
        grupo,
        series,
        reps,
        carga,
      ]
    )

    res.status(201).json(result.rows[0])

  } catch (err) {
    console.log(err)

    res.status(500).json({
      erro: 'Erro ao criar exercício',
    })
  }
}

exports.listar = async (req, res) => {
  try {
    const { treinoId } = req.params

    const result = await pool.query(
      `
      SELECT *
      FROM exercicios
      WHERE treino_id = $1
      ORDER BY id ASC
      `,
      [treinoId]
    )

    res.json(result.rows)

  } catch (err) {
    console.log(err)

    res.status(500).json({
      erro: 'Erro ao listar exercícios',
    })
  }
}