/* eslint  func-names: 0 */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const responseMessages = require('../libs/response-messages');
const { RequestWrong } = require('../errors');
const { getResponse } = require('../libs/helpers');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, responseMessages.validation.requiredField],
      unique: true,
      validate: {
        validator(valid) {
          return validator.isEmail(valid);
        },
        message: props => `${props.value} ${responseMessages.validation.email}`
      }
    },
    password: {
      type: String,
      required: [true, responseMessages.validation.requiredField],
      minlenght: [8, responseMessages.validation.toShortPassword],
      select: false
    },
    name: {
      type: String,
      required: [true, responseMessages.validation.requiredField],
      minlength: [2, responseMessages.validation.toShort],
      maxlength: [30, responseMessages.validation.toLong]
    }
  },
  {
    versionKey: false
  }
);

UserSchema.plugin(
  uniqueValidator,
  new RequestWrong(responseMessages.clientErrors.mailAlreadyExists)
);

UserSchema.statics.findUserByCredentials = function(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then(user => {
      if (!user) {
        return Promise.reject(new RequestWrong(responseMessages.clientErrors.authentication));
      }
      return bcrypt.compare(password, user.password).then(matched => {
        if (!matched) {
          return Promise.reject(new RequestWrong(responseMessages.clientErrors.authentication));
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
    ).then(updatingUser => getResponse(res, updatingUser));
  });
};

module.exports = mongoose.model('user', UserSchema);
