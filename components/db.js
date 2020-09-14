const mongoose = require('mongoose');
const userSchema = require('./user');


const userModel = mongoose.model('user', userSchema);

module.exports = {
    UserModel: userModel
}