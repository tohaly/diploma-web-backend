const Articles = require('../models/article');

const { getResponse } = require('../libs/helpers');
const { REMOVE_ARTICLE } = require('../config/constants/response-messages/success');

module.exports.getArticles = (req, res, next) => {
  Articles.find({ owner: req.user._id })
    .then(articles => {
      getResponse(res, articles);
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Articles.create({ keyword, title, text, date, source, link, image, owner: req.user._id })
    .then(articles => {
      getResponse(res, articles);
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Articles.findByIdAndDelete(req.params.articleId)
    .then(res.status(200).send({ message: REMOVE_ARTICLE }))
    .catch(next);
};
