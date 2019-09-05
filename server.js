const bodyParser = require('body-parser');
const http = require('http');
const express = require('express');
const sms = require('./routes/sms');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/textWeather', { useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(() => console.error('Unable to connect to MongoDB...'))

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/sms', sms);

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});