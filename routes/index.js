var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var router = express.Router();
var User = require('../models/user')
var mid = require('../middleware');

router.get('/profile', mid.requiresLogin, function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                return res.render('profile', { title: 'Profile', user: user});
            }
        })
});

router.post('/profile', function(req, res, next) {
    User.updateOne(
        { _id: req.session.userId },
        {"$set":
            {
                "metric": Boolean(req.body.metric),
                "main": Boolean(req.body.main),
                "description": Boolean(req.body.description),
                "temp": Boolean(req.body.temp),
                "pressure": Boolean(req.body.pressure),
                "humidity": Boolean(req.body.humidity),
                "temp_min": Boolean(req.body.temp_min),
                "temp_max": Boolean(req.body.temp_max),
                "speed": Boolean(req.body.speed),
                "deg": Boolean(req.body.deg),
                "all": Boolean(req.body.all),
                "sunrise": Boolean(req.body.sunrise),
                "sunset": Boolean(req.body.sunset)
            }
        }
    )
     .then(dbModel => res.redirect('/profile'))
     .catch(err => res.status(422).json(err));
});

router.get('/logout', function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

router.get('/login', mid.loggedOut, function(req, res, next) {
    return res.render('login', { title: 'Login'});
});

router.post('/login', function(req, res, next) {
    if (req.body.phoneNumber && req.body.password) {
        User.authenticate(req.body.phoneNumber, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    } else {
        var err = new Error('Email and password are required.');
        err.status = 401;
        return next(err);
    }
});

router.get('/register', mid.loggedOut, function(req, res, next) {
    return res.render('register', { title: 'Register'});
});

router.post('/register', function(req, res, next) {
    if (req.body.phoneNumber && 
        req.body.password &&
        req.body.confirmPassword) {
            const phoneNumber = '+1' + req.body.phoneNumber.replace(/[^0-9]/g, '');
            
            if (req.body.password !== req.body.confirmPassword) {
                var err = new Error('Passwords do not match');
                err.status = 400;
                return next(err);
            }

            User.findOne({ phoneNumber: phoneNumber })
                .exec(function (error, user) {
                    if (error) {
                        return next(error)
                } else if ( user ) {
                    var err = new Error('Phone number in use.');
                    err.status = 401;
                    return next(err);
                }
            })

            var userData = {
                phoneNumber: phoneNumber,
                password: req.body.password
            };

            User.create(userData, function(error, user) {
                if (error) {
                    return next(error);
                } else {
                    req.session.userId = user._id;
                    return res.redirect('/profile');
                }
            });

        } else {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
        }
});

router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' });
});

module.exports = router;