const Article = require('../models/article');
const responseMessages = require('../libs/response-messages');
const RequestWrong = require('../errors/request-wrong');

module.exports.doesArticleBelongUser = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .then(article => {
      if (req.user._id !== String(article.owner)) {
        throw new RequestWrong(responseMessages.clientErrors.forbidden);
      }
      next();
    })
    .catch(next);
};
