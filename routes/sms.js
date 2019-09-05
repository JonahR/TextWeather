const config = require('../config');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const getWeatherByCityName = require('../services/weatherByCity');
const client = require('twilio')(config.twilio.accountSid, config.twilio.authToken);


const router = express.Router();

router.post('/', async (req, res) => {
    const body = req.body.Body;

    const data = await getWeatherByCityName(body);

    const temp = data.main.temp;
    
    const twiml = new MessagingResponse();
    
    twiml.message(temp);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

module.exports = router;
