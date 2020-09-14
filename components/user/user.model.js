const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  sensitiveInfo: {
    email: {
      type: String,
      required: true,
    },
    socialLogin: {
      type: Object,
    },
    password: {
      type: String,
      required: true,
    },
  },
  picture: {
    type: String,
  },
});

userSchema.methods = {
  generateHash: function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
};

userSchema.statics = {
  register: function (user) {
    const model = this;
    user.username = user.displayName.toLowercase();
    if (!user.sensitiveInfo) user.sensitiveInfo = {};
    user.sensitiveInfo.email = user.email;
    user.sensitiveInfo.password = user.password;
    user.sensitiveInfo.socialLogin = user.socialLogin;

    const newUser = new model(user);
    newUser.sensitiveInfo.password = newUser.generateHash(user.password);
    return newUser.save();
  },
};

module.exports = userSchema;
