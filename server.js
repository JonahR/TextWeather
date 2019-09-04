const http = require('http');
const express = require('express');
const sms = require('./routes/sms');

const app = express();

app.use('/sms', sms);

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});