"use strict"

var addSurvey = require('survey');
var express = require('express');
var unirest = require('unirest');
var bodyParser = require('body-parser');
var path = require('path');
var jsonParser = bodyParser.json();
var passport = require ("passport");
var fetch = require('isomorphic-fetch');
var OAuthSimple = require('oauthsimple');
var BasicStrategy = require('passport-http').BasicStrategy;

var config = require('./config');


var app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(jsonParser);

var strategy = new BasicStrategy(function(username, password, callback) {
    User.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            callback(err);
            return;
        }

        if (!user) {
            return callback(null, false, {
                message: 'Incorrect username.'
            });
        }

        user.validatePassword(password, function(err, isValid) {
            if (err) {
                return callback(err);
            }

            if (!isValid) {
                return callback(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return callback(null, user);
        });
    });
});

passport.use(strategy);


var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        console.log(err);
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}

var User = require('./models/userModel').User;
var UserGame = require('./models/surveyModel').Survey;

//endpoints

var bcrypt = require('bcryptjs');

//signin endpoint
//(create new user) POST (name, email, password, city)
app.post('/users', jsonParser, function(req, res) {
  console.log(req.body);
    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }

    if (!('username' in req.body)) {
      console.log(req.body);
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    var username = req.body.username;

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({
            message: 'Incorrect field length: username'
        });
    }

    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }

    var password = req.body.password;

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            var user = new User({
                name: req.body.name,
                username: username,
                password: hash,
                email: req.body.username
            });

            user.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }

                return res.status(201).json({});
            });
        });
    });
});

app.use(passport.initialize());

app.get('/hidden', jsonParser, passport.authenticate('basic', {
    session: false
}), function(req, res) {
    res.json({
        message: 'This is a test'
    });
});


app.post("/addsurvey", function(req, res) {
  console.log(req.body);
  req.body.answers.forEach(function(answer) {

  });
  res.status(201).json({});
});

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

app.listen(8080);
exports.app = app;
exports.runServer = runServer;
