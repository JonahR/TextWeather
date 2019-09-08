var mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({}));

exports.User = User;