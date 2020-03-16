const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { doesArticleExist } = require('../middlewares/is-article-exist');
const { doesArticleBelongUser } = require('../middlewares/does-article-belong-user');
const { validateCreateArticle } = require('../middlewares/request-validation');

router.get('/', getArticles);
router.post('/', validateCreateArticle, createArticle);
router.delete('/:articleId', doesArticleExist, doesArticleBelongUser, deleteArticle);

module.exports = router;
