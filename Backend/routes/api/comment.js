const router = require('express').Router();
const Comment = require('../../models/comment.model')

// * GET /comment/ -> Muestra todos los comentarios

router.get('/', async (req, res) => {
  try {
    const comment = await Comment.getAll()
    res.json(comment)
  } catch (error) {
    res.json({ error: error.messagge })
  }
});

// * GET /comment/delete/:commentId -> Elimina un comentario por su ID

router.get('/delete/:commentId', async (req, res) => {
  const commentId = req.params['commentId'];
  const deleteComment = await Comment.deleteComment(commentId)
  res.redirect('/comment')
})

// * POST /comment/new -> Crea un nuevo comentario

router.post('/new', async (req, res) => {
  try {
    const result = await Comment.create(req.body)
    res.json(result)
  } catch (error) {
    res.json({ error: error.messagge })
  }
});

// * POST /catalog/update -> Modifica el contenido de un comentario.

router.post('/update', async (req, res) => {
  const result = await Comment.updateById(req.body.id, req.body)
  res.redirect('/comment')
});






module.exports = router;