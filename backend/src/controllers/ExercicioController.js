// ExercicioController.js

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

    // Validação estendida para garantir que nenhum dado importante chegue vazio
    if (!treino_id || !nome || !grupo || !series || !reps) {
      return res.status(400).json({
        erro: 'Dados obrigatórios ausentes',
      })
    }

    const result = await pool.query(
      `
      INSERT INTO exercicios (treino_id, nome, grupo_muscular, series, repeticoes, carga)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        treino_id, 
        nome, 
        grupo,   
        series, 
        reps,    
        carga
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

// Adicione isto ao final do seu ExercicioController.js

exports.excluir = async (req, res) => {
  try {
    const { id } = req.params

    // Remove o exercício pelo ID dele
    const result = await pool.query(
      'DELETE FROM exercicios WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ erro: 'Exercício não encontrado.' })
    }

    res.json({ mensagem: 'Exercício excluído com sucesso!' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro interno ao excluir o exercício.' })
  }
}