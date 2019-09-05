const config = require('./config');
const client = require('twilio')(config.twilio.accountSid, config.twilio.authToken);


function sendMessage(text) {
    client.messages.create({
        body: text,
        from: config.twilio.phoneNumber,
        to: '+16512950514'
    })
    .then(message => console.log(message.sid))
}




