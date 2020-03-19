const Article = require('../models/article');
const { FORBIDDEN } = require('../config/constants/response-messages/client-errors');
const { RequestWrong } = require('../errors');

module.exports.doesArticleBelongUser = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .then(article => {
      if (req.user._id !== String(article.owner)) {
        throw new RequestWrong(FORBIDDEN);
      }
      next();
    })
    .catch(next);
};
