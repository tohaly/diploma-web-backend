const { celebrate, Joi } = require('celebrate');
const { joiFieldsOptions, joiObjectsOptions } = require('./joi-options');

const validateCreateUser = celebrate({
  body: Joi.object()
    .keys({
      name: joiFieldsOptions.name,
      email: joiFieldsOptions.email,
      password: joiFieldsOptions.password
    })
    .messages(joiObjectsOptions)
});

const validateLogin = celebrate({
  body: Joi.object()
    .keys({
      email: joiFieldsOptions.email,
      password: joiFieldsOptions.password
    })
    .messages(joiObjectsOptions)
});

const validateCreateArticle = celebrate({
  body: Joi.object()
    .keys({
      keyword: joiFieldsOptions.justString,
      title: joiFieldsOptions.justString,
      text: joiFieldsOptions.justString,
      date: joiFieldsOptions.justString,
      source: joiFieldsOptions.justString,
      link: joiFieldsOptions.link,
      image: joiFieldsOptions.link
    })
    .messages(joiObjectsOptions)
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateCreateArticle
};
