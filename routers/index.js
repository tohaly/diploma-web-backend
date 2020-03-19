const router = require('express').Router();
const users = require('./users');
const articles = require('./articles');
const { notFoundRes } = require('../middlewares/not-found-res');

router.use('/users', users);
router.use('/articles', articles);

router.use('/', notFoundRes);

module.exports = router;
