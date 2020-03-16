const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { doesArticleExist } = require('../middlewares/is-article-exist');

router.get('/', getArticles);
router.post('/', createArticle);
router.delete('/:articleId', doesArticleExist, deleteArticle);

module.exports = router;
