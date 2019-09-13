const bodyParser = require('body-parser');
const config = require('./config');
const http = require('http');
const express = require('express');
const session = require('express-session');
const sms = require('./routes/sms');
const index = require('./routes/index');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

// Database connection
mongoose.connect("mongodb://localhost/textWeather", { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))

const app = express();

app.use(session({
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
      mongooseConnection: db
  })
}));

app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/sms', sms);
app.use('/', index)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});