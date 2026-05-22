const router = require('express').Router()

const authMiddleware = require('../middlewares/authMiddleware')

router.get('/me', authMiddleware, async (req, res) => {
  res.json({
    ok: true,
    usuarioId: req.usuarioId,
  })
})

module.exports = router