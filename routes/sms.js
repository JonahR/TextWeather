const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const createMessage = require('../services/createMessage');
const getWeatherByCityName = require('../services/weatherByCity');
const { User } = require('../models/user'); 

const router = express.Router();

let jonah = new User({
    main: {
        temp: true
    },
    wind: {
        speed: true
    },
    phoneNumer: '+16512950514'
})

router.post('/', async (req, res) => {
    const textBody = req.body.Body;
    let message;

    try{       
        const weatherData = await getWeatherByCityName(textBody);
        message = createMessage(jonah, weatherData);
    } catch (err) {
        message = err.response.data.message
    }

    const twiml = new MessagingResponse();
    
    twiml.message(message);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

module.exports = router;
