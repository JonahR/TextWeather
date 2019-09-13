const config = require('../config');
const axios = require('axios');

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const METRIC = 'metric';
const IMPERIAL = 'imperial';

async function getWeatherByCityName(city, units){
    return axios.get(`${API_URL}?q=${city}&units=${units ? METRIC : IMPERIAL}&APPID=${config.openWeather.apiKey}`, { validateStatus: false} )
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

module.exports = getWeatherByCityName;