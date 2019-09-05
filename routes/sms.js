const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const createMessage = require('../services/createMessage');
const getWeatherByCityName = require('../services/weatherByCity');
const getUserFromDB = require('../services/getUserFromDB');

const router = express.Router();

router.post('/', async (req, res) => {
    const textBody = req.body.Body;
    let message;
    const user = await getUserFromDB(req.body.From);
    try {       
        const weatherData = await getWeatherByCityName(textBody);
        message = createMessage(user, weatherData);
    } catch (err) {
        console.log(err);
    }

    const twiml = new MessagingResponse();
    
    twiml.message(message);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

module.exports = router;
