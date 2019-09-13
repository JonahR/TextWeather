var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    metric: {
        type: Boolean,
        default: false
    },
    main: {
        type: Boolean,
        default: false
    },
    description: {
        type: Boolean,
        default: true
    },
    temp: {
        type: Boolean,
        default: true
    },
    pressure: {
        type: Boolean,
        default: false
    },
    humidity: {
        type: Boolean,
        default: false
    },
    temp_min: {
        type: Boolean,
        default: true
    },
    temp_max: {
        type: Boolean,
        default: true
    },
    speed: {
        type: Boolean,
        default: true
    },
    deg: {
        type: Boolean,
        default: false
    },
    all: {
        type: Boolean,
        default: false
    },
    sunrise: {
        type: Boolean,
        default: false
    },
    sunset: {
        type: Boolean,
        default: false
    }
});

UserSchema.statics.authenticate = function(phoneNumber, password, callback) {
    User.findOne({ phoneNumber: "+1" + phoneNumber })
        .exec(function (error, user) {
            if (error) {
                return callback(error)
            } else if ( !user ) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcryptjs.compare(password, user.password, function(error, result) {
                if ( result === true ) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        })
}

UserSchema.pre('save', function(next) {
    var user = this;
    bcryptjs.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

var User = mongoose.model('User', UserSchema);
module.exports = User; 