const { Joi } = require('celebrate');
const joiMessages = require('./joi-messages');

module.exports.joiFiledsOptions = {
  name: Joi.string()
    .required()
    .min(2)
    .max(30)
    .messages({
      'string.base': joiMessages.string,
      'string.empty': joiMessages.empty,
      'string.min': joiMessages.toShort,
      'string.max': joiMessages.toLong,
      'any.required': joiMessages.requiredField
    }),
  link: Joi.string()
    .required()
    .uri()
    .messages({
      'string.base': joiMessages.string,
      'any.required': joiMessages.requiredField,
      'string.uri': joiMessages.uri
    }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      'string.base': joiMessages.string,
      'string.empty': joiMessages.empty,
      'string.min': joiMessages.toShort,
      'any.required': joiMessages.requiredField
    }),
  email: Joi.string()
    .required()
    .min(3)
    .email()
    .messages({
      'string.base': joiMessages.string,
      'string.empty': joiMessages.empty,
      'any.required': joiMessages.requiredField,
      'string.email': joiMessages.email
    }),
  justString: Joi.string()
    .required()
    .messages({
      'string.base': joiMessages.string,
      'string.empty': joiMessages.empty,
      'any.required': joiMessages.requiredField
    })
};

module.exports.joiObjectsOptions = {
  'object.unknown': joiMessages.notAllowed
};
