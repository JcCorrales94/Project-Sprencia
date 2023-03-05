const router = require('express').Router()
const apiUsersRouter = require('./api/users');
const apiCatalogRouter = require('./api/catalog');
const apiCommentRouter = require('./api/comment')

router.use('/users', apiUsersRouter);
router.use('/catalog', apiCatalogRouter);
router.use('/comment', apiCommentRouter);



module.exports = router;