const Article = require('../models/article');
const responseMessages = require('../libs/response-messages');
const NotFoundError = require('../errors/not-found-error');

module.exports.doesArticleExist = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then(article => {
      if (!article) {
        throw new NotFoundError(responseMessages.clientErrors.articleNotFound);
      }
      next();
    })
    .catch(next);
};
