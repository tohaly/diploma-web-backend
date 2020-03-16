const mongoose = require('mongoose');
const validator = require('validator');

const responseMessages = require('../libs/response-messages');

const ArticleSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: [true, responseMessages.validation.requiredField]
    },
    title: {
      type: String,
      required: [true, responseMessages.validation.requiredField]
    },
    text: {
      type: String,
      required: [true, responseMessages.validation.requiredField]
    },
    date: {
      type: String,
      required: [true, responseMessages.validation.requiredField]
    },
    source: {
      type: String,
      required: [true, responseMessages.validation.requiredField]
    },
    link: {
      type: String,
      required: [true, responseMessages.validation.requiredField],
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: props => `${props.value} ${responseMessages.validation.url}`
      }
    },
    image: {
      type: String,
      required: [true, responseMessages.validation.requiredField],
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: props => `${props.value} ${responseMessages.validation.url}`
      }
    },
    owner: {
      required: [true, responseMessages.validation.requiredField],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      select: false
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('card', ArticleSchema);
