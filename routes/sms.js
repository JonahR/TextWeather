const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const createMessage = require('../helpers/createMessage');
const getWeatherByCityName = require('../helpers/weatherByCity');
const getUserFromDB = require('../helpers/getUserFromDB');

const router = express.Router();

router.post('/', async (req, res) => {
    let message;

    try {       
        const user = await getUserFromDB(req.body.From);
        const weatherData = await getWeatherByCityName(req.body.Body, user.metric); // What happen if errors out? Add metric/imperia
        message = createMessage(user, weatherData);
    } catch (err) {
        console.error(err);
    }

    const twiml = new MessagingResponse();
    
    twiml.message(message);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

module.exports = router;
