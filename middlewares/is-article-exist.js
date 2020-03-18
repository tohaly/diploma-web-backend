const Article = require('../models/article');
const { ARTICLE_NOT_FOUND } = require('../config/constants/response-messages/client-errors');
const { NotFoundError } = require('../errors');

module.exports.doesArticleExist = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then(article => {
      if (!article) {
        throw new NotFoundError(ARTICLE_NOT_FOUND);
      }
      next();
    })
    .catch(next);
};
