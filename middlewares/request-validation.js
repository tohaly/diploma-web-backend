const { celebrate, Joi } = require('celebrate');
const { joiFiledsOptions, joiObjectsOptions } = require('../libs/joi-options');

const validateCreateUser = celebrate({
  body: Joi.object()
    .keys({
      name: joiFiledsOptions.name,
      email: joiFiledsOptions.email,
      password: joiFiledsOptions.password
    })
    .messages(joiObjectsOptions)
});

const validateLogin = celebrate({
  body: Joi.object()
    .keys({
      email: joiFiledsOptions.email,
      password: joiFiledsOptions.password
    })
    .messages(joiObjectsOptions)
});

const validateCreateArticle = celebrate({
  body: Joi.object()
    .keys({
      keyword: joiFiledsOptions.justString,
      title: joiFiledsOptions.justString,
      text: joiFiledsOptions.justString,
      date: joiFiledsOptions.justString,
      source: joiFiledsOptions.justString,
      link: joiFiledsOptions.link,
      image: joiFiledsOptions.link
    })
    .messages(joiObjectsOptions)
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateCreateArticle
};
