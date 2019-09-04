const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const router = express.Router();

router.post('/', async (req, res) => {
    const twiml = new MessagingResponse();

    if (req.body.Body == 'hello') {
        twiml.message('Hi!');
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

module.exports = router;