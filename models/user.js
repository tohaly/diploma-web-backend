/* eslint  func-names: 0 */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const {
  REQUIRED_FIELD,
  IS_EMAIL_VALID,
  MAIL_ALREADY_EXISTS,
  TO_SHORT_PASSWORD,
  TO_SHORT,
  TO_LONG
} = require('../config/constants/response-messages/validation-errors');
const { AUTHENTICATION } = require('../config/constants/response-messages/client-errors');
const { RequestWrong } = require('../errors');
const { getResponse } = require('../libs/helpers');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, REQUIRED_FIELD],
      unique: true,
      validate: {
        validator(valid) {
          return validator.isEmail(valid);
        },
        message: props => `${props.value} ${IS_EMAIL_VALID}`
      }
    },
    password: {
      type: String,
      required: [true, REQUIRED_FIELD],
      minlength: [8, TO_SHORT_PASSWORD],
      select: false
    },
    name: {
      type: String,
      required: [true, REQUIRED_FIELD],
      minlength: [2, TO_SHORT],
      maxlength: [30, TO_LONG]
    }
  },
  {
    versionKey: false
  }
);

UserSchema.plugin(uniqueValidator, new RequestWrong(MAIL_ALREADY_EXISTS));

UserSchema.statics.findUserByCredentials = function(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then(user => {
      if (!user) {
        return Promise.reject(new RequestWrong(AUTHENTICATION));
      }
      return bcrypt.compare(password, user.password).then(matched => {
        if (!matched) {
          return Promise.reject(new RequestWrong(AUTHENTICATION));
        }
        return user;
      });
    });
};

UserSchema.statics.updatePassword = function(user, res) {
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return Promise.reject(err);
    }
    return this.findByIdAndUpdate(
      user._id,
      { password: hash },
      {
        new: true,
        runValidators: true,
        upsert: true
      }
    ).then(updatingUser => getResponse(res, updatingUser, 201));
  });
};

module.exports = mongoose.model('user', UserSchema);
