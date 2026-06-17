// UsuarioController.js

const pool = require('../db/pool')

exports.buscarPerfil = async (
  req,
  res
) => {
  try {
    const usuarioId =
      req.usuarioId

    const resultado =
      await pool.query(
        `
        SELECT id,
         nome, 
         email, 
         foto_perfil 
         FROM usuarios WHERE 
         id = $1
        `,
        [usuarioId]
      )

    res.json(
      resultado.rows[0]
    )

  } catch (err) {
    console.log(err)

    res.status(500).json({
      erro:
        'Erro ao buscar perfil',
    })
  }
}

exports.atualizarPerfil =
async (req, res) => {
  try {
    const usuarioId =
      req.usuarioId

    const {
      nome,
      email,
      foto,
    } = req.body

    const resultado =
      await pool.query(
        `
        UPDATE usuarios SET 
        nome = $1, 
        email = $2, 
        foto_perfil = $3 
        WHERE id = $4
        RETURNING
          id,
          nome,
          email,
          foto
        `,
        [
          nome,
          email,
          foto,
          usuarioId,
        ]
      )

    res.json(
      resultado.rows[0]
    )

  } catch (err) {
    console.log(err)

    res.status(500).json({
      erro:
        'Erro ao atualizar perfil',
    })
  }
}

exports.buscarEstatisticas = async (req, res) => {
  try {
    const usuarioId = req.usuarioId

    // 1. Conta a quantidade total de treinos criados pelo usuário
    const treinosRes = await pool.query(
      'SELECT COUNT(*) FROM treinos WHERE usuario_id = $1',
      [usuarioId]
    )

    // 2. Conta quantos grupos musculares distintos e o total de séries nos exercícios de todos os treinos dele
    const exerciciosRes = await pool.query(
      `
      SELECT 
        COUNT(DISTINCT grupo_muscular) as total_grupos,
        SUM(COALESCE(series, 0)) as total_series
      FROM exercicios
      WHERE treino_id IN (SELECT id FROM treinos WHERE usuario_id = $1)
      `,
      [usuarioId]
    )

    res.json({
      totalTreinos: parseInt(treinosRes.rows[0].count) || 0,
      totalGrupos: parseInt(exerciciosRes.rows[0].total_grupos) || 0,
      totalSeries: parseInt(exerciciosRes.rows[0].total_series) || 0
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      erro: 'Erro ao buscar estatísticas do painel',
    })
  }
}