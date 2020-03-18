const mongoose = require('mongoose');
const validator = require('validator');

const {
  REQUIRED_FIELD,
  IS_URL_VALID
} = require('../config/constants/response-messages/validation-errors');

const ArticleSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    title: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    text: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    date: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    source: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    link: {
      type: String,
      required: [true, REQUIRED_FIELD],
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: props => `${props.value} ${IS_URL_VALID}`
      }
    },
    image: {
      type: String,
      required: [true, REQUIRED_FIELD],
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: props => `${props.value} ${IS_URL_VALID}`
      }
    },
    owner: {
      required: [true, REQUIRED_FIELD],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      select: false
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('article', ArticleSchema);
