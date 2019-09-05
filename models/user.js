var mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    main: {
        temp: Boolean
    },
    wind: {
        speed: Boolean
    },
    phoneNumber: {
        type: String,
    }
}));

exports.User = User;