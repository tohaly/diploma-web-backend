const mongoose = require('mongose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const errMessages = require('../libs/response-messages');
const RequestWrong = require('../errors/request-wrong');

const UserSchema = new mongose.Schema({
  email: {
    type: String,
    required: [true, errMessages.validation.requiredField],
    unique: true,
    validate: {
      validator(valid) {
        return validator.isEmail(valid);
      },
      message: props => `${props.value} ${errMessages.validation.email}`
    }
  },
  password: {
    type: String,
    required: [true, errMessages.validation.requiredField],
    minlenght: [8, errMessages.validation.toShortPassword],
    select: false
  },
  name: {
    type: String,
    required: [true, errMessages.validation.requiredField],
    minlength: [2, errMessages.validation.toShort],
    maxlength: [30, errMessages.validation.toLong]
  }
});

UserSchema.plugin(
  uniqueValidator,
  new RequestWrong(responseMessages.clientErrors.mailAlreadyExists)
);

// eslint-disable-next-line func-names
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

// eslint-disable-next-line func-names
UserSchema.statics.updatePassword = function(user, res) {
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return Promise.reject(err);
    }
    return this.findByIdAndUpdate(user._id, { password: hash }, updateOptions).then(updatingUser =>
      getResponse(res, updatingUser)
    );
  });
};

module.exports = mongoose.model('user', UserSchema);
