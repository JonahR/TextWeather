const config = require('./config');
const axios = require('axios');
const client = require('twilio')(config.twilio.accountSid, config.twilio.authToken);

const apiURL = 'https://api.openweathermap.org/data/2.5/weather';

function getWeatherByCityName(city){
        axios.get(`${apiURL}?q=${city}&APPID=${config.openWeather.apiKey}`).then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
}

function sendMessage(text) {
    client.messages.create({
        body: text,
        from: config.twilio.phoneNumber,
        to: '+16512950514'
    })
    .then(message => console.log(message.sid))
}

sendMessage('Hello');

getWeatherByCityName('Edina');



