const config = require('../config');
const axios = require('axios');

const apiURL = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeatherByCityName(city){
    const response = await axios.get(`${apiURL}?q=${city}&APPID=${config.openWeather.apiKey}`);
    return response.data;
}

module.exports = getWeatherByCityName;