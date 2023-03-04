const router = require('express').Router()
const apiUsersRouter = require('./api/users');
const apiCatalogRouter = require('./api/catalog')

router.use('/users', apiUsersRouter);
router.use('/catalog', apiCatalogRouter);




module.exports = router;