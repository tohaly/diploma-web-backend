const router = require('express').Router();
const users = require('./users');
const areticles = require('./articles');
const { notFoundRes } = require('../middlewares/not-found-res');

router.use('/users', users);
router.use('/articles', areticles);

router.use('/', notFoundRes);

module.exports = router;
