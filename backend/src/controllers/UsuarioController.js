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