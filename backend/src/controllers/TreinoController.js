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

exports.excluir = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Primeiro deletamos os exercícios vinculados a esse treino para evitar erros de chave estrangeira
    await pool.query('DELETE FROM exercicios WHERE treino_id = $1', [id]);

    // 2. Agora deletamos o treino em si
    const result = await pool.query('DELETE FROM treinos WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ erro: 'Treino não encontrado.' });
    }

    res.json({ mensagem: 'Treino e seus exercícios foram excluídos com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno ao excluir o treino.' });
  }
};